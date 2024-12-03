import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SecurityFeatures from './SecurityFeatures';
import axios from 'axios';

jest.mock('axios');

describe('SecurityFeatures Component', () => {
    it('renders loading state', () => {
        render(<SecurityFeatures />);
        expect(screen.getByText(/loading security features/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<SecurityFeatures />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders feature list', async () => {
        const mockFeatures = [
            { id: 1, name: 'Two-Factor Authentication', description: 'Enhances security by requiring two forms of verification.' },
            { id: 2, name: 'Encryption', description: 'Protects data by converting it into a secure format.' },
        ];

        axios.get.mockResolvedValue({ data: mockFeatures });

        render(<SecurityFeatures />);
        await waitFor(() => expect(screen.queryByText(/loading security features/i)).not.toBeInTheDocument());
        expect(screen.getByText(/security features/i)).toBeInTheDocument();
        expect(screen.getByText(/two-factor authentication/i)).toBeInTheDocument();
        expect(screen.getByText(/encryption/i)).toBeInTheDocument();
    });
});
