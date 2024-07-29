import React from 'react';
import Plot from 'react-plotly.js';

const PltLineChart = (props) => {
    const layout = {
        title: props.chart_title,
        xaxis: { title: props.xAxis_tittle},
        yaxis: { title: props.yAxis_tittle }
    };

    // Preparing data for plotting
    const plotData = [{
        x: props.data.map(item => item[props.xItem]),
        y: props.data.map(item => item[props.yItem]),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' },
    }];

    return <Plot data={plotData} layout={layout} />;
};

export default PltLineChart;
