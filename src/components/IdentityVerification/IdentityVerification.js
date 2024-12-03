import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IdentityVerification.css';

const IdentityVerification = () => {
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVerifications = async () => {
            try {
                const response = await axios.get('https://api.example.com/identity/verifications'); // Replace with your API endpoint
                setVerifications(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchVerifications();
    }, []);

    if (loading) return <div className="loading">Loading identity verifications...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="identity-verification-container">
            <h2>Identity Verification</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {verifications.map(verification => (
                        <tr key={verification.id}>
                            <td>{verification.name}</td>
                            <td>{verification.status}</td>
                            <td>{new Date(verification.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IdentityVerification;
