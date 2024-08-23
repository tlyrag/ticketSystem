import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 

const CjsLineChart = ({ data, labels,title }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
            title: {
                display:true,
                text:title
            }
        });

        return () => {
            lineChart.destroy();
        };
    }, [data, labels]); 

    return (
        <canvas ref={chartRef}></canvas>
    );
};

export default CjsLineChart;
