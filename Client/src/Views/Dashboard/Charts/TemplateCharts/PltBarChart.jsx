import React from 'react';
import Plot from 'react-plotly.js';

const PltBarChart = (props) => {

    const layout = {
        title: props.charTitle,
        xaxis: { title: props.xAxisTitle },
        yaxis: { title: props.yAxistTitle, type: 'linear' },
        bargap: 0.05,
    };

    const plotData = [{
        x: props.xData,
        y: props.yData,
        type: 'bar',
        marker: { color: 'blue' },
    }];

    return <Plot data={plotData} layout={layout} />;
};

export default PltBarChart;
