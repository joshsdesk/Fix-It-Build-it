import { describe, it, expect, vi } from 'vitest';
import { onRequest } from './_middleware';

describe('Admin Authentication Middleware', () => {
  const validUsername = 'admin';
  const validPassword = 'supersecretpassword';
  const validAuthHeader = `Basic ${btoa(`${validUsername}:${validPassword}`)}`;

  const createMockContext = ({
    headers = {},
    env = { ADMIN_USERNAME: validUsername, ADMIN_PASSWORD: validPassword },
    next = vi.fn().mockResolvedValue(new Response('OK', { status: 200 })),
  }: {
    headers?: Record<string, string>;
    env?: { ADMIN_USERNAME?: string; ADMIN_PASSWORD?: string };
    next?: () => Promise<Response>;
  } = {}) => {
    const request = new Request('https://example.com/admin', {
      headers,
    });

    return {
      request,
      env,
      next,
      params: {},
      waitUntil: vi.fn(),
      functionPath: '/admin',
      data: {},
      pluginArgs: {},
    } as unknown as Parameters<typeof onRequest>[0];
  };

  describe('Unconfigured Environment (Fail Closed)', () => {
    it('should return 500 if ADMIN_USERNAME is missing', async () => {
      const context = createMockContext({
        env: { ADMIN_PASSWORD: validPassword },
      });

      const response = await onRequest(context);

      expect(response.status).toBe(500);
      expect(await response.text()).toBe('Internal Server Error: Authentication Not Configured');
      expect(context.next).not.toHaveBeenCalled();
    });

    it('should return 500 if ADMIN_PASSWORD is missing', async () => {
      const context = createMockContext({
        env: { ADMIN_USERNAME: validUsername },
      });

      const response = await onRequest(context);

      expect(response.status).toBe(500);
      expect(await response.text()).toBe('Internal Server Error: Authentication Not Configured');
      expect(context.next).not.toHaveBeenCalled();
    });

    it('should return 500 if both credentials are missing', async () => {
      const context = createMockContext({
        env: {},
      });

      const response = await onRequest(context);

      expect(response.status).toBe(500);
      expect(await response.text()).toBe('Internal Server Error: Authentication Not Configured');
      expect(context.next).not.toHaveBeenCalled();
    });

    it('should return 500 if credentials are empty strings', async () => {
      const context = createMockContext({
        env: { ADMIN_USERNAME: '', ADMIN_PASSWORD: '' },
      });

      const response = await onRequest(context);

      expect(response.status).toBe(500);
      expect(await response.text()).toBe('Internal Server Error: Authentication Not Configured');
      expect(context.next).not.toHaveBeenCalled();
    });
  });

  describe('Authentication Failure', () => {
    it('should return 401 with WWW-Authenticate header when Authorization header is missing', async () => {
      const context = createMockContext({
        headers: {},
      });

      const response = await onRequest(context);

      expect(response.status).toBe(401);
      expect(response.headers.get('WWW-Authenticate')).toBe('Basic realm="Admin Area"');
      expect(await response.text()).toBe('Unauthorized');
      expect(context.next).not.toHaveBeenCalled();
    });

    it('should return 401 when Authorization header has incorrect password', async () => {
      const context = createMockContext({
        headers: {
          Authorization: `Basic ${btoa(`${validUsername}:wrongpassword`)}`,
        },
      });

      const response = await onRequest(context);

      expect(response.status).toBe(401);
      expect(response.headers.get('WWW-Authenticate')).toBe('Basic realm="Admin Area"');
      expect(await response.text()).toBe('Unauthorized');
      expect(context.next).not.toHaveBeenCalled();
    });

    it('should return 401 when Authorization header uses wrong scheme', async () => {
      const context = createMockContext({
        headers: {
          Authorization: `Bearer ${btoa(`${validUsername}:${validPassword}`)}`,
        },
      });

      const response = await onRequest(context);

      expect(response.status).toBe(401);
      expect(response.headers.get('WWW-Authenticate')).toBe('Basic realm="Admin Area"');
      expect(await response.text()).toBe('Unauthorized');
      expect(context.next).not.toHaveBeenCalled();
    });
  });

  describe('Authentication Success', () => {
    it('should call context.next() and return its response when valid credentials are provided', async () => {
      const expectedResponse = new Response('Admin Dashboard', { status: 200 });
      const nextMock = vi.fn().mockResolvedValue(expectedResponse);

      const context = createMockContext({
        headers: {
          Authorization: validAuthHeader,
        },
        next: nextMock,
      });

      const response = await onRequest(context);

      expect(context.next).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
      expect(await response.text()).toBe('Admin Dashboard');
    });
  });
});
