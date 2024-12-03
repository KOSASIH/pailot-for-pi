import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomDashboard.css';

const CustomDashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/dashboard/data'); // Replace with your API endpoint
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading dashboard data...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="custom-dashboard-container">
            <h2>Custom Dashboard</h2>
            <div className="dashboard-cards">
                {data.map(item => (
                    <div className="dashboard-card" key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><strong>Value:</strong> {item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomDashboard;
