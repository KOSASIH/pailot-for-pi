import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TokenEconomy.css';

const TokenEconomy = () => {
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get('https://api.example.com/tokens'); // Replace with your API endpoint
                setTokens(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchTokens();
    }, []);

    if (loading) return <div className="loading">Loading tokens...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="token-economy-container">
            <h2>Token Economy</h2>
            <ul>
                {tokens.map(token => (
                    <li key={token.id}>
                        <strong>{token.name}</strong>: {token.value} {/* Assuming each token has an id, name, and value */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TokenEconomy;
