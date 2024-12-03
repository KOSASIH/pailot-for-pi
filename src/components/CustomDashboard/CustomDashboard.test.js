import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomDashboard from './CustomDashboard';
import axios from 'axios';

jest.mock('axios');

describe('CustomDashboard Component', () => {
    it('renders loading state', () => {
        render(<CustomDashboard />);
        expect(screen.getByText(/loading dashboard data/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<CustomDashboard />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders dashboard data', async () => {
        const mockData = [
            { id: 1, title: 'Metric A', description: 'Description for Metric A', value: 100 },
            { id: 2, title: 'Metric B', description: 'Description for Metric B', value: 200 },
        ];

        axios.get.mockResolvedValue({ data: mockData });

        render(<CustomDashboard />);
        await waitFor(() => expect(screen.queryByText(/loading dashboard data/i)).not.toBeInTheDocument());
        expect(screen.getByText(/custom dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/metric a/i)).toBeInTheDocument();
        expect(screen.getByText(/metric b/i)).toBeInTheDocument();
    });
});
