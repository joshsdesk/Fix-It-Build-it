import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SensoryNeedsWizard from './SensoryWizard';

describe('SensoryNeedsWizard', () => {
    it('renders initial step correctly', () => {
        render(<SensoryNeedsWizard onRequestConsultation={vi.fn()} />);

        expect(screen.getByText('The Energy Check', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('High Energy')).toBeInTheDocument();
        expect(screen.getByText('Battery Recharge')).toBeInTheDocument();
    });

    it('builds and submits a high-energy sensory recommendation', async () => {
        const mockRequestConsultation = vi.fn();
        const user = userEvent.setup();
        render(<SensoryNeedsWizard onRequestConsultation={mockRequestConsultation} />);

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

        await user.click(screen.getByText(/Request Consultation/i));

        expect(mockRequestConsultation).toHaveBeenCalledWith({
            specs: 'Sensory Wizard Results — Energy: Big Body, Sensory Profile: Proprio, Friction: Sleep Disruption, Environment: Homeowner (No HOA), Funding: Private Pay. Recommendation: Tier 2 Sensory: Light and noise reduction for circadian regulation. | Tier 3 Structural: Heavy-duty climbing holds and deep-pressure compression zones.'
        });
    });

    it('builds and submits a recharge-focused sensory recommendation', async () => {
        const mockRequestConsultation = vi.fn();
        const user = userEvent.setup();
        render(<SensoryNeedsWizard onRequestConsultation={mockRequestConsultation} />);

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

        await user.click(screen.getByText(/Request Consultation/i));

        expect(mockRequestConsultation).toHaveBeenCalledWith({
            specs: 'Sensory Wizard Results — Energy: Recharge, Sensory Profile: Auditory, Friction: Meltdown Recovery, Environment: Renter, Funding: Private Pay. Recommendation: Tier 2 Sensory: Escape Spaces, Decompression nooks with <50 Lux capability. | Tier 2 Sensory: NRC ≥ 0.75 acoustic panels and sound isolation. | Tier 1 Baseline: Flat-Pack Solution, Zero-penetration, free-standing structures due to Renter status.'
        });
    });

    it('allows starting over from step 4', async () => {
        const user = userEvent.setup();
        render(<SensoryNeedsWizard onRequestConsultation={vi.fn()} />);

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
