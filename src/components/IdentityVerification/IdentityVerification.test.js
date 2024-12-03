import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import IdentityVerification from './IdentityVerification';
import axios from 'axios';

jest.mock('axios');

describe('IdentityVerification Component', () => {
    it('renders loading state', () => {
        render(<IdentityVerification />);
        expect(screen.getByText(/loading identity verifications/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<IdentityVerification />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders verification list', async () => {
        const mockVerifications = [
            { id: 1, name: 'John Doe', status: 'Verified', date: '2023-01-01' },
            { id: 2, name: 'Jane Smith', status: 'Pending', date: '2023-01-02' },
        ];

        axios.get.mockResolvedValue({ data: mockVerifications });

        render(<IdentityVerification />);
        await waitFor(() => expect(screen.queryByText(/loading identity verifications/i)).not.toBeInTheDocument());
        expect(screen.getByText(/identity verification/i)).toBeInTheDocument();
        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    });
});
