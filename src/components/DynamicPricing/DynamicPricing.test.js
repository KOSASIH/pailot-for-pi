import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DynamicPricing from './DynamicPricing';
import axios from 'axios';

jest.mock('axios');

describe('DynamicPricing Component', () => {
    it('renders loading state', () => {
        render(<DynamicPricing />);
        expect(screen.getByText(/loading prices/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<DynamicPricing />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders price list', async () => {
        const mockPrices = [
            { id: 1, product: 'Product A', price: 10.99 },
            { id: 2, product: 'Product B', price: 9.99 },
        ];

        axios.get.mockResolvedValue({ data: mockPrices });

        render(<DynamicPricing />);
        await waitFor(() => expect(screen.queryByText(/loading prices/i)).not.toBeInTheDocument());
        expect(screen.getByText(/dynamic pricing/i)).toBeInTheDocument();
        expect(screen.getByText(/product a/i)).toBeInTheDocument();
        expect(screen.getByText(/product b/i)).toBeInTheDocument();
    });
});
