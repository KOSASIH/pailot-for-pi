import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EnvironmentalImpact from './EnvironmentalImpact';
import axios from 'axios';

jest.mock('axios');

describe('EnvironmentalImpact Component', () => {
    it('renders loading state', () => {
        render(<EnvironmentalImpact />);
        expect(screen.getByText(/loading environmental impacts/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<EnvironmentalImpact />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders impact list', async () => {
        const mockImpacts = [
            { id: 1, type: 'Air Pollution', description: 'Release of harmful substances into the atmosphere.', severity: 'High' },
            { id: 2, type: 'Water Pollution', description: 'Contamination of water bodies.', severity: 'Medium' },
        ];

        axios.get.mockResolvedValue({ data: mockImpacts });

        render(<EnvironmentalImpact />);
        await waitFor(() => expect(screen.queryByText(/loading environmental impacts/i)).not.toBeInTheDocument());
        expect(screen.getByText(/environmental impact/i)).toBeInTheDocument();
        expect(screen.getByText(/air pollution/i)).toBeInTheDocument();
        expect(screen.getByText(/water pollution/i)).toBeInTheDocument();
    });
});
