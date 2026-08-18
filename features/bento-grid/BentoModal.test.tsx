import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BentoModal from './BentoModal';
import { expect, test, describe, vi } from 'vitest';

describe('BentoModal Navigation', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        category: 'past' as const,
    };

    test('should render first image initially', () => {
        render(<BentoModal {...defaultProps} />);

        const img = screen.getByAltText('Specialized Installation') as HTMLImageElement;
        expect(img).toBeInTheDocument();

        expect(screen.getByText(/1 \/ 5/)).toBeInTheDocument();
    });

    test('should navigate to next image', async () => {
        const user = userEvent.setup();
        render(<BentoModal {...defaultProps} />);

        const nextButton = screen.getByRole('button', { name: /next image/i });

        await user.click(nextButton);

        await waitFor(() => {
            const img = screen.getByAltText('Hardware Mounting') as HTMLImageElement;
            expect(img).toBeInTheDocument();
        });
        expect(screen.getByText(/2 \/ 5/)).toBeInTheDocument();
    });

    test('should navigate to previous image and wrap around', async () => {
        const user = userEvent.setup();
        render(<BentoModal {...defaultProps} />);

        const prevButton = screen.getByRole('button', { name: /previous image/i });

        await user.click(prevButton);

        await waitFor(() => {
            const img = screen.getByAltText('Enclosure Build') as HTMLImageElement;
            expect(img).toBeInTheDocument();
        });
        expect(screen.getByText(/5 \/ 5/)).toBeInTheDocument();
    });

    test('should wrap around to first image when clicking next on last image', async () => {
        const user = userEvent.setup();
        render(<BentoModal {...defaultProps} />);

        const nextButton = screen.getByRole('button', { name: /next image/i });

        for (let i = 0; i < 5; i++) {
            await user.click(nextButton);
        }

        await waitFor(() => {
            const img = screen.getByAltText('Specialized Installation') as HTMLImageElement;
            expect(img).toBeInTheDocument();
        });
        expect(screen.getByText(/1 \/ 5/)).toBeInTheDocument();
    });

    test('should navigate to specific image when clicking progress dots', async () => {
        const user = userEvent.setup();
        render(<BentoModal {...defaultProps} />);

        const progressButton3 = screen.getByRole('button', { name: /go to slide 3/i });

        await user.click(progressButton3);

        await waitFor(() => {
            const img = screen.getByAltText('Sensory Setup') as HTMLImageElement;
            expect(img).toBeInTheDocument();
        });
        expect(screen.getByText(/3 \/ 5/)).toBeInTheDocument();
    });
});
