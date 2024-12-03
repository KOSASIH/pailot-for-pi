import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './PredictiveAnalytics.css';

const PredictiveAnalytics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [predictions, setPredictions] = useState([]);

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

    useEffect(() => {
        if (data.length > 0) {
            generatePredictions(data);
        }
    }, [data]);

    const generatePredictions = async (inputData) => {
        try {
            const response = await axios.post('https://api.example.com/predict', { data: inputData }); // Replace with your prediction API
            setPredictions(response.data);
        } catch (err) {
            console.error("Prediction error:", err);
        }
    };

    const chartData = {
        labels: data.map(item => item.date), // Assuming data has a date field
        datasets: [
            {
                label: 'Actual Data',
                data: data.map(item => item.value), // Assuming data has a value field
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Predicted Data',
                data: predictions,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="predictive-analytics">
            <h2>Predictive Analytics</h2>
            <Line data={chartData} />
        </div>
    );
};

export default PredictiveAnalytics;
