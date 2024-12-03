import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SecurityFeatures.css';

const SecurityFeatures = () => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await axios.get('https://api.example.com/security/features'); // Replace with your API endpoint
                setFeatures(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchFeatures();
    }, []);

    if (loading) return <div className="loading">Loading security features...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="security-features-container">
            <h2>Security Features</h2>
            <ul>
                {features.map(feature => (
                    <li key={feature.id}>
                        <strong>{feature.name}</strong>: {feature.description} {/* Assuming each feature has an id, name, and description */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SecurityFeatures;
