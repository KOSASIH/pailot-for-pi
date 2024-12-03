import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import IoTIntegration from './IoTIntegration';
import axios from 'axios';

jest.mock('axios');

describe('IoTIntegration Component', () => {
    it('renders loading state', () => {
        render(<IoTIntegration />);
        expect(screen.getByText(/loading devices/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        render(<IoTIntegration />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders device list', async () => {
        const mockDevices = [
            { id: 1, name: 'Temperature Sensor', status: 'Online' },
            { id: 2, name: 'Humidity Sensor', status: 'Offline' },
        ];

        axios.get.mockResolvedValue({ data: mockDevices });

        render(<IoTIntegration />);
        await waitFor(() => expect(screen.queryByText(/loading devices/i)).not.toBeInTheDocument());
        expect(screen.getByText(/iot device integration/i)).toBeInTheDocument();
        expect(screen.getByText(/temperature sensor/i)).toBeInTheDocument();
        expect(screen.getByText(/humidity sensor/i)).toBeInTheDocument();
    });
});
