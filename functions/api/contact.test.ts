import { describe, it, expect } from 'vitest';
import { onRequestPost } from './contact';

describe('Contact Form Validation', () => {
    const mockEnv = {
        CLOUDFLARE_SECRET_KEY: 'test_secret',
        EMAILJS_SERVICE_ID: 'test_service',
        EMAILJS_TEMPLATE_ID: 'test_template',
        EMAILJS_PUBLIC_KEY: 'test_public',
        EMAILJS_PRIVATE_KEY: 'test_private',
    };

    const createRequest = (body: any) => {
        return new Request('https://example.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    };

    it('should return 400 if token is missing', async () => {
        const req = createRequest({
            name: 'John Doe',
            email: 'john@example.com',
            // token missing
        });

        const response = await onRequestPost({ request: req, env: mockEnv });
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

        const response = await onRequestPost({ request: req, env: mockEnv });
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

        const response = await onRequestPost({ request: req, env: mockEnv });
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

        const response = await onRequestPost({ request: req, env: mockEnv });
        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data).toEqual({ success: false, error: 'Missing or invalid contact details' });
    });
});
