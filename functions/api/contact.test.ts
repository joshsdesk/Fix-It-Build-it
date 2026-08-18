import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { onRequestPost } from './contact';

describe('contact API', () => {
  const mockEnv = {
    CLOUDFLARE_SECRET_KEY: 'test_secret_key',
    EMAILJS_SERVICE_ID: 'test_service_id',
    EMAILJS_TEMPLATE_ID: 'test_template_id',
    EMAILJS_PUBLIC_KEY: 'test_public_key',
    EMAILJS_PRIVATE_KEY: 'test_private_key',
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
        // token missing
      });

      const response = await onRequestPost({ request: req, env: mockEnv, params: {}, waitUntil: () => {}, next: () => Promise.resolve(new Response()) });
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Missing security token' });
    });

    it('should return 400 if name is missing', async () => {
      const req = createRequest({
        token: 'valid_token',
        email: 'john@example.com',
        // name missing
      });

      const response = await onRequestPost({ request: req, env: mockEnv, params: {}, waitUntil: () => {}, next: () => Promise.resolve(new Response()) });
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Missing or invalid contact details' });
    });

    it('should return 400 if email is missing', async () => {
      const req = createRequest({
        token: 'valid_token',
        name: 'John Doe',
        // email missing
      });

      const response = await onRequestPost({ request: req, env: mockEnv, params: {}, waitUntil: () => {}, next: () => Promise.resolve(new Response()) });
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Missing or invalid contact details' });
    });

    it('should return 400 if email is invalid', async () => {
      const req = createRequest({
        token: 'valid_token',
        name: 'John Doe',
        email: 'not-an-email',
      });

      const response = await onRequestPost({ request: req, env: mockEnv, params: {}, waitUntil: () => {}, next: () => Promise.resolve(new Response()) });
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Missing or invalid contact details' });
    });
  });

  describe('Error Paths', () => {
    it('should return 502 if EmailJS send fails', async () => {
      // Mock fetch to succeed for Turnstile but fail for EmailJS
      global.fetch = vi.fn().mockImplementation((url: string | URL | Request) => {
        const urlStr = url.toString();
        if (urlStr.includes('turnstile')) {
          return Promise.resolve({
            json: () => Promise.resolve({ success: true }),
          } as Response);
        }
        if (urlStr.includes('emailjs')) {
          return Promise.resolve({
            ok: false,
            status: 500,
            text: () => Promise.resolve('EmailJS internal error'),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected fetch to ${urlStr}`));
      });

      // Create a mock Request
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CF-Connecting-IP': '127.0.0.1',
        },
        body: JSON.stringify(validBody),
      });

      const response = await onRequestPost({ request, env: mockEnv, params: {}, waitUntil: () => {}, next: () => Promise.resolve(new Response()) });

      expect(response.status).toBe(502);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Failed to send email' });
    });

    it('should return 500 if an unexpected error is thrown and log it internally', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const testError = new Error('Sensitive database connection string leaked');

      // Force request.json() to throw
      const mockRequest = {
        json: vi.fn().mockRejectedValue(testError),
        headers: {
          get: vi.fn().mockReturnValue('127.0.0.1'),
        },
      } as unknown as Request;

      const response = await onRequestPost({ request: mockRequest, env: mockEnv, params: {}, waitUntil: () => {}, next: () => Promise.resolve(new Response()) });

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Internal Server Error' });
      expect(consoleErrorSpy).toHaveBeenCalledWith('Internal server error:', testError);
    });

    it('should return generic 500 for non-Error thrown values and log it internally', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Force request.json() to throw a string
      const mockRequest = {
        json: vi.fn().mockRejectedValue('Some internal error'),
        headers: {
          get: vi.fn().mockReturnValue('127.0.0.1'),
        },
      } as unknown as Request;

      const response = await onRequestPost({ request: mockRequest, env: mockEnv, params: {}, waitUntil: () => {}, next: () => Promise.resolve(new Response()) });

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ success: false, error: 'Internal Server Error' });
      expect(consoleErrorSpy).toHaveBeenCalledWith('Internal server error:', 'Some internal error');
    });
  });
});
