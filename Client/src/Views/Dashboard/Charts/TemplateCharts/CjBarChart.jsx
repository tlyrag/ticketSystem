import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data, labels, chartTitle }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
                    data: data,
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // 'rgba(255, 206, 86, 0.2)',
                        // 'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)',
                        //'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        //'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        return () => {
            barChart.destroy();
        };
    }, [data, labels, chartTitle]); // Re-run when these values change

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default BarChart;
