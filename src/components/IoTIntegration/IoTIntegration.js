import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IoTIntegration.css';

const IoTIntegration = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get('https://api.example.com/iot/devices'); // Replace with your API endpoint
                setDevices(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    if (loading) return <div className="loading">Loading devices...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="iot-integration-container">
            <h2>IoT Device Integration</h2>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>
                        <strong>{device.name}</strong>: {device.status} {/* Assuming each device has an id, name, and status */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IoTIntegration;
