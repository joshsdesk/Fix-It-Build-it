import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { onRequestPost } from './contact';

describe('contact API', () => {
  const mockEnv = {
    RESEND_API_KEY: 'test_resend_key',
    RESEND_FROM_EMAIL: 'Fix-It Build-It <intake@example.com>',
    RESEND_TO_EMAIL: 'owner@example.com',
  };

  const validBody = {
    leadType: 'Private Pay',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
  };

  const createRequest = (body: Record<string, unknown>) => {
    return new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('Resend Success', () => {
    it('should return success when email send succeeds', async () => {
      let sentPayload: Record<string, unknown> | undefined;
      global.fetch = vi.fn().mockImplementation((url: string | URL | Request, init?: RequestInit) => {
        const urlStr = url.toString();
        if (urlStr.includes('resend')) {
          sentPayload = JSON.parse(init?.body as string) as Record<string, unknown>;
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ id: 'email_123' }),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected fetch to ${urlStr}`));
      });

      const request = createRequest(validBody);
      const response = await onRequestPost({ request, env: mockEnv });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({ success: true });
      expect(sentPayload).toMatchObject({
        from: 'Fix-It Build-It <intake@example.com>',
        to: ['owner@example.com'],
        reply_to: validBody.email,
      });
    });

    it('uses the lowercase Resend account email as the default recipient', async () => {
      let sentPayload: Record<string, unknown> | undefined;
      global.fetch = vi.fn().mockImplementation((_url: string | URL | Request, init?: RequestInit) => {
        sentPayload = JSON.parse(init?.body as string) as Record<string, unknown>;
        return Promise.resolve({ ok: true } as Response);
      });

      const response = await onRequestPost({ request: createRequest(validBody), env: { RESEND_API_KEY: 'test_resend_key' } });

      expect(response.status).toBe(200);
      expect(sentPayload).toMatchObject({ to: ['fixitbuilditcolorado@gmail.com'] });
    });
  });

  describe('Error Paths', () => {
    it('should return 500 if Resend API fails', async () => {
      global.fetch = vi.fn().mockImplementation((url: string | URL | Request) => {
        const urlStr = url.toString();
        if (urlStr.includes('resend')) {
          return Promise.resolve({
            ok: false,
            status: 500,
            json: () => Promise.resolve({ message: 'Resend internal error' }),
            text: () => Promise.resolve(JSON.stringify({ message: 'Resend internal error' })),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected fetch to ${urlStr}`));
      });

      const request = createRequest(validBody);
      const response = await onRequestPost({ request, env: mockEnv });

      expect(response.status).toBe(502);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Resend rejected the email: Resend internal error' });
    });

    it('should return 500 if RESEND_API_KEY is missing', async () => {
      const request = createRequest(validBody);
      const response = await onRequestPost({ request, env: {} });

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({
        success: false,
        error: 'Email is not configured yet. Add RESEND_API_KEY to the Cloudflare Pages environment.',
      });
    });

    it('should return 500 if an unexpected error is thrown', async () => {
      const mockRequest = {
        json: vi.fn().mockRejectedValue(new Error('Failed to parse JSON')),
      } as unknown as Request;

      const response = await onRequestPost({ request: mockRequest, env: mockEnv });

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Internal Server Error' });
    });
  });
});