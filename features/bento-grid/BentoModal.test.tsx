import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
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

        const buttons = screen.getAllByRole('button');
        const nextButton = buttons[2]; // Next button

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

        const buttons = screen.getAllByRole('button');
        const prevButton = buttons[1]; // Prev button

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

        const buttons = screen.getAllByRole('button');
        const nextButton = buttons[2]; // Next button

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

        const buttons = screen.getAllByRole('button');
        const progressButton3 = buttons[5]; // Index 3 is the 3rd progress dot

        await user.click(progressButton3);

        await waitFor(() => {
            const img = screen.getByAltText('Sensory Setup') as HTMLImageElement;
            expect(img).toBeInTheDocument();
        });
        expect(screen.getByText(/3 \/ 5/)).toBeInTheDocument();
    });
});
