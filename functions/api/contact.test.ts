import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { onRequestPost } from './contact';

describe('contact API', () => {
  const mockEnv = {
    TURNSTILE_SECRET_KEY: 'test_secret_key',
    RESEND_API_KEY: 'test_resend_key',
  };

  const invoke = (request: Request) => {
    const context = {
      request,
      env: mockEnv,
      params: {},
      waitUntil: () => {},
      next: () => Promise.resolve(new Response()),
    };

    return onRequestPost(context);
  };

  const validBody = {
    token: 'valid_token',
    name: 'John Doe',
    email: 'john@example.com',
    category: 'residential',
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

  describe('Validation', () => {
    it('should return 400 if token is missing', async () => {
      const req = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const response = await invoke(req);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Unable to submit the form. Please try again.' });
    });

    it('should return 400 if name is missing', async () => {
      const req = createRequest({
        token: 'valid_token',
        email: 'john@example.com',
      });

      const response = await invoke(req);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Unable to submit the form. Please try again.' });
    });

    it('should return 400 if email is missing', async () => {
      const req = createRequest({
        token: 'valid_token',
        name: 'John Doe',
      });

      const response = await invoke(req);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Unable to submit the form. Please try again.' });
    });

    it('should return 400 if email is invalid', async () => {
      const req = createRequest({
        token: 'valid_token',
        name: 'John Doe',
        email: 'not-an-email',
      });

      const response = await invoke(req);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Unable to submit the form. Please try again.' });
    });
  });

  describe('Turnstile and resend success', () => {
    it('should return success when both verification and send succeed', async () => {
      global.fetch = vi.fn().mockImplementation((url: string | URL | Request) => {
        const urlStr = url.toString();
        if (urlStr.includes('turnstile')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          } as Response);
        }
        if (urlStr.includes('resend')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ id: 'email_123' }),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected fetch to ${urlStr}`));
      });

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CF-Connecting-IP': '127.0.0.1',
        },
        body: JSON.stringify(validBody),
      });

      const response = await invoke(request);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({ success: true });
    });

    it('should return 400 on failed Turnstile verification', async () => {
      global.fetch = vi.fn().mockImplementation((url: string | URL | Request) => {
        const urlStr = url.toString();
        if (urlStr.includes('turnstile')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: false }),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected fetch to ${urlStr}`));
      });

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CF-Connecting-IP': '127.0.0.1',
        },
        body: JSON.stringify(validBody),
      });

      const response = await invoke(request);

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Security verification failed.' });
    });
  });

  describe('Error Paths', () => {
    it('should return 502 if Resend send fails', async () => {
      global.fetch = vi.fn().mockImplementation((url: string | URL | Request) => {
        const urlStr = url.toString();
        if (urlStr.includes('turnstile')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          } as Response);
        }
        if (urlStr.includes('resend')) {
          return Promise.resolve({
            ok: false,
            status: 500,
            text: () => Promise.resolve('Resend internal error'),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected fetch to ${urlStr}`));
      });

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CF-Connecting-IP': '127.0.0.1',
        },
        body: JSON.stringify(validBody),
      });

      const response = await invoke(request);

      expect(response.status).toBe(502);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Unable to submit the form. Please try again.' });
    });

    it('should return 500 if an unexpected error is thrown', async () => {
      const mockRequest = {
        json: vi.fn().mockRejectedValue(new Error('Failed to parse JSON')),
        headers: {
          get: vi.fn().mockReturnValue('127.0.0.1'),
        },
      } as unknown as Request;

      const response = await invoke(mockRequest);

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Unable to submit the form. Please try again.' });
    });

    it('should return 500 for generic non-Error thrown values', async () => {
      const mockRequest = {
        json: vi.fn().mockRejectedValue('Some string error'),
        headers: {
          get: vi.fn().mockReturnValue('127.0.0.1'),
        },
      } as unknown as Request;

      const response = await invoke(mockRequest);

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Unable to submit the form. Please try again.' });
    });
  });
});