import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 

const CjDoughnutChart = (props) => {
    const chartRef = useRef(null);
    const data = [12, 19, 3, 5, 2, 3]; // Example data
    const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']; // Example labels

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: props.labels,
                datasets: [{
                    label: props.title,
                    data: props.values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: props.title
                  }
                }
              },
        });

        return () => {
            doughnutChart.destroy();
        };
    }, [data, labels]);

    return (
        <canvas ref={chartRef}></canvas>
    );
};


export default CjDoughnutChart