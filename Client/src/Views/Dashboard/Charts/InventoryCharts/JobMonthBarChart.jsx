import React from 'react';
import Plot from 'react-plotly.js';
import PltBarChart from '../TemplateCharts/PltBarChart'
const JobMonthBarChart = (props) => {

    // Function to aggregate data
    const aggregateData = () => {
        const aggregated = props.data.reduce((acc, item) => {
            const date = new Date(item.actual_received_date);
            const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; // Create a year-month string
            acc[yearMonth] = (acc[yearMonth] || 0) + parseInt(item.quantity_ordered, 10); // Aggregate quantity
            return acc;
        }, {});

        const dates = Object.keys(aggregated).sort((a, b) => new Date(a) - new Date(b)); 
        const quantities = dates.map(date => aggregated[date]);

        return { dates, quantities };
    };

    const { dates, quantities } = aggregateData();
    
    const chartData = {
        charTitle: 'Quantity of Jobs vs. Actual Received Date',
        xAxisTitle: 'Actual Received Date' ,
        yAxisTitle: 'Quantity Ordered',
        xData:dates,
        yData:quantities
    };


    return <PltBarChart 
        charTitle={chartData.charTitle} 
        xAxisTitle={chartData.xAxisTitle} 
        yAxisTitle={chartData.yAxisTitle} 
        xData ={chartData.xData}
        yData ={chartData.yData}
    />;
};

export default JobMonthBarChart;

