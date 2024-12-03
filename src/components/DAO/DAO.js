import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DAO.css';

const DAO = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/data'); // Replace with your API endpoint
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="dao-container">
            <h2>Data Access Object</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li> // Assuming each item has an id and name
                ))}
            </ul>
        </div>
    );
};

export default DAO;
