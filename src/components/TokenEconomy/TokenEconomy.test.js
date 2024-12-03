import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TokenEconomy from './TokenEconomy';
import axios from 'axios';

jest.mock('axios');

describe('TokenEconomy Component', () => {
    it('renders loading state', () => {
        render(<TokenEconomy />);
        expect(screen.getByText(/loading tokens/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<TokenEconomy />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders token list', async () => {
        const mockTokens = [
            { id: 1, name: 'Token A', value: 100 },
            { id: 2, name: 'Token B', value: 200 },
        ];

        axios.get.mockResolvedValue({ data: mockTokens });

        render(<TokenEconomy />);
        await waitFor(() => expect(screen.queryByText(/loading tokens/i)).not.toBeInTheDocument());
        expect(screen.getByText(/token economy/i)).toBeInTheDocument();
        expect(screen.getByText(/token a/i)).toBeInTheDocument();
        expect(screen.getByText(/token b/i)).toBeInTheDocument();
    });
});
