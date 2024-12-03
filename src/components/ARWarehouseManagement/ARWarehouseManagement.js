import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ARWarehouseManagement.css';

const ARWarehouseManagement = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://api.example.com/warehouse/items'); // Replace with your API endpoint
                setItems(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <div className="loading">Loading warehouse items...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="ar-warehouse-management-container">
            <h2>AR Warehouse Management</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <strong>{item.name}</strong>: {item.quantity} in stock {/* Assuming each item has an id, name, and quantity */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ARWarehouseManagement;
