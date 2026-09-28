import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import SensoryNeedsWizard from '@/features/sensory-wizard/SensoryWizard';

describe('SensoryNeedsWizard', () => {
    it('renders initial step correctly', () => {
        render(<SensoryNeedsWizard />);

        expect(screen.getByText('The Energy Check', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('High Energy')).toBeInTheDocument();
        expect(screen.getByText('Battery Recharge')).toBeInTheDocument();
    });

    it('builds and submits a high-energy sensory recommendation', async () => {
        const user = userEvent.setup();
        render(<SensoryNeedsWizard />);

        await user.click(screen.getByText('High Energy'));
        expect(screen.getByText('Sensory Profile & Behavior', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Deep Pressure', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Constant Motion', { exact: false })).toBeInTheDocument();
        await user.click(screen.getByText('Deep Pressure', { exact: false }));
        await user.click(screen.getByRole('button', { name: /Next Step/ }));

        expect(screen.getByText('Spatial (ASPECTSS Room Friction)', { exact: false })).toBeInTheDocument();
        await user.click(screen.getByText('Sleep Disruption'));
        await user.click(screen.getByRole('button', { name: /Next Step/ }));

        expect(screen.getByText('Housing Constraints', { exact: false })).toBeInTheDocument();
        await user.click(screen.getByText('Homeowner (No HOA)'));
        await user.click(screen.getByText('Private Pay'));
        await user.click(screen.getByRole('button', { name: /Generate Recommendation/ }));

        expect(screen.getByText('Recommendation Found', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(/Heavy-duty climbing holds/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Consultations Temporarily Paused' })).toBeDisabled();
    });

    it('builds and submits a recharge-focused sensory recommendation', async () => {
        const user = userEvent.setup();
        render(<SensoryNeedsWizard />);

        await user.click(screen.getByText('Battery Recharge'));
        expect(screen.getByText('Sensory Profile & Behavior', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Sound Seeker')).toBeInTheDocument();
        await user.click(screen.getByText('Sound Seeker'));
        await user.click(screen.getByRole('button', { name: /Next Step/ }));

        expect(screen.getByText('Spatial (ASPECTSS Room Friction)', { exact: false })).toBeInTheDocument();
        await user.click(screen.getByText('Meltdown Recovery'));
        await user.click(screen.getByRole('button', { name: /Next Step/ }));
        await user.click(screen.getByText('Renter'));
        await user.click(screen.getByText('Private Pay'));
        await user.click(screen.getByRole('button', { name: /Generate Recommendation/ }));

        expect(screen.getByRole('button', { name: 'Consultations Temporarily Paused' })).toBeDisabled();
    });

    it('allows starting over from step 4', async () => {
        const user = userEvent.setup();
        render(<SensoryNeedsWizard />);

        await user.click(screen.getByText('High Energy'));
        await user.click(screen.getByText('Constant Motion', { exact: false }));
        await user.click(screen.getByRole('button', { name: /Next Step/ }));
        await user.click(screen.getByText('Property Damage'));
        await user.click(screen.getByRole('button', { name: /Next Step/ }));
        await user.click(screen.getByText('Renter'));
        await user.click(screen.getByText('Private Pay'));
        await user.click(screen.getByRole('button', { name: /Generate Recommendation/ }));

        expect(screen.getByText('Recommendation Found', { exact: false })).toBeInTheDocument();

        await user.click(screen.getByText('Start Over'));

        expect(screen.getByText('The Energy Check', { exact: false })).toBeInTheDocument();
    });
});
