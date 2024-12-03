import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DAO from './DAO';
import axios from 'axios';

jest.mock('axios');

describe('DAO Component', () => {
    it('renders loading state', () => {
        render(<DAO />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<DAO />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders data list', async () => {
        const mockData = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];

        axios.get.mockResolvedValue({ data: mockData });

        render(<DAO />);
        await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
        expect(screen.getByText(/data access object/i)).toBeInTheDocument();
        expect(screen.getByText(/item 1/i)).toBeInTheDocument();
        expect(screen.getByText(/item 2/i)).toBeInTheDocument();
    });
});
