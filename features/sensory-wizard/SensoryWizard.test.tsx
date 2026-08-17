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

    it('navigates through "High Energy" -> "Deep Pressure" -> "Safer Bedroom" flow', async () => {
        const mockRequestConsultation = vi.fn();
        const user = userEvent.setup();
        render(<SensoryNeedsWizard onRequestConsultation={mockRequestConsultation} />);

        // Step 1: Energy Check
        await user.click(screen.getByText('High Energy'));

        // Step 2: Sensory Profile
        expect(screen.getByText('Sensory Profile', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Deep Pressure')).toBeInTheDocument();
        expect(screen.getByText('Constant Motion')).toBeInTheDocument();

        await user.click(screen.getByText('Deep Pressure'));

        // Step 3: Build Goal
        expect(screen.getByText('The Build Goal', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Safer Bedroom')).toBeInTheDocument();

        await user.click(screen.getByText('Safer Bedroom'));

        // Step 4: Recommendation
        expect(screen.getByText('Recommendation Found', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(/Structural Integrity Focus/i)).toBeInTheDocument();

        // Request Consultation
        await user.click(screen.getByText(/Request Consultation/i));

        expect(mockRequestConsultation).toHaveBeenCalledWith({
            specs: 'Sensory Wizard results — Energy: Big Body, Sensory Profile: Proprio, Build Goal: Safer Bedroom. Recommendation: Structural Integrity Focus: Heavy-duty climbing walls, compression nooks, and impact-resistant mounting.'
        });
    });

    it('navigates through "Battery Recharge" -> "Sound Seeker" -> "Focused Study" flow', async () => {
        const mockRequestConsultation = vi.fn();
        const user = userEvent.setup();
        render(<SensoryNeedsWizard onRequestConsultation={mockRequestConsultation} />);

        // Step 1
        await user.click(screen.getByText('Battery Recharge'));

        // Step 2
        expect(screen.getByText('Sensory Profile', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Sound Seeker')).toBeInTheDocument();
        expect(screen.getByText('Sound Sensitive')).toBeInTheDocument();

        await user.click(screen.getByText('Sound Seeker'));

        // Step 3
        await user.click(screen.getByText('Focused Study'));

        // Step 4
        expect(screen.getByText(/Acoustic Tuning/i)).toBeInTheDocument();

        await user.click(screen.getByText(/Request Consultation/i));

        expect(mockRequestConsultation).toHaveBeenCalledWith({
            specs: 'Sensory Wizard results — Energy: Recharge, Sensory Profile: Seeker, Build Goal: Focused Study. Recommendation: Acoustic Tuning: Sound-dampening panels with designated audio zones for controlled stimulation.'
        });
    });

    it('allows starting over from step 4', async () => {
        const user = userEvent.setup();
        render(<SensoryNeedsWizard onRequestConsultation={vi.fn()} />);

        await user.click(screen.getByText('High Energy'));
        await user.click(screen.getByText('Constant Motion'));
        await user.click(screen.getByText('Durable Play Zone'));

        expect(screen.getByText('Recommendation Found', { exact: false })).toBeInTheDocument();

        await user.click(screen.getByText('Start Over'));

        expect(screen.getByText('The Energy Check', { exact: false })).toBeInTheDocument();
    });
});
