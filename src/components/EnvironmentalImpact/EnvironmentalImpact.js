import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EnvironmentalImpact.css';

const EnvironmentalImpact = () => {
    const [impacts, setImpacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImpacts = async () => {
            try {
                const response = await axios.get('https://api.example.com/environmental/impacts'); // Replace with your API endpoint
                setImpacts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchImpacts();
    }, []);

    if (loading) return <div className="loading">Loading environmental impacts...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="environmental-impact-container">
            <h2>Environmental Impact</h2>
            <table>
                <thead>
                    <tr>
                        <th>Impact Type</th>
                        <th>Description</th>
                        <th>Severity</th>
                    </tr>
                </thead>
                <tbody>
                    {impacts.map(impact => (
                        <tr key={impact.id}>
                            <td>{impact.type}</td>
                            <td>{impact.description}</td>
                            <td>{impact.severity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnvironmentalImpact;
