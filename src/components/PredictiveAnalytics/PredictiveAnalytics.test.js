import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PredictiveAnalytics from './PredictiveAnalytics';
import axios from 'axios';

jest.mock('axios');

describe('PredictiveAnalytics Component', () => {
    it('renders loading state', () => {
        render(<PredictiveAnalytics />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<PredictiveAnalytics />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders chart with data', async () => {
        const mockData = [
            { date: '2023-01-01', value: 100 },
            { date: '2023-01-02', value: 200 },
        ];
        const mockPredictions = [150, 250];

        axios.get.mockResolvedValue({ data: mockData });
        axios.post.mockResolvedValue({ data: mockPredictions });

        render(<PredictiveAnalytics />);
        await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
        expect(screen.getByText(/predictive analytics/i)).toBeInTheDocument();
    });
});
