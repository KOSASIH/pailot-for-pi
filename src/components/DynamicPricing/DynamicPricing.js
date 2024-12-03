import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DynamicPricing.css';

const DynamicPricing = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get('https://api.example.com/prices'); // Replace with your API endpoint
                setPrices(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    if (loading) return <div className="loading">Loading prices...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="dynamic-pricing-container">
            <h2>Dynamic Pricing</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map(price => (
                        <tr key={price.id}>
                            <td>{price.product}</td>
                            <td>${price.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicPricing;
