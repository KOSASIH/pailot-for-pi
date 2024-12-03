import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ARWarehouseManagement from './ARWarehouseManagement';
import axios from 'axios';

jest.mock('axios');

describe('ARWarehouseManagement Component', () => {
    it('renders loading state', () => {
        render(<ARWarehouseManagement />);
        expect(screen.getByText(/loading warehouse items/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<ARWarehouseManagement />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders item list', async () => {
        const mockItems = [
            { id: 1, name: 'Item A', quantity: 50 },
            { id: 2, name: 'Item B', quantity: 30 },
        ];

        axios.get.mockResolvedValue({ data: mockItems });

        render(<ARWarehouseManagement />);
        await waitFor(() => expect(screen.queryByText(/loading warehouse items/i)).not.toBeInTheDocument());
        expect(screen.getByText(/ar warehouse management/i)).toBeInTheDocument();
        expect(screen.getByText(/item a/i)).toBeInTheDocument();
        expect(screen.getByText(/item b/i)).toBeInTheDocument();
    });
});
