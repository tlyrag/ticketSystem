import React from 'react';
import Plot from 'react-plotly.js';

const PltPieChart = (props) => {
    // Aggregate data by OWNER_IND


    // Prepare data for the pie chart
    const trace = {
        labels: props.labels,
        values: props.values,
        type: 'pie',
        textinfo: 'label+percent',
        insidetextorientation: 'radial',
        texttemplate: "%{label}: %{percent:.3%}", 
        hoverinfo: 'label+percent'
    };

    const layout = {
        title: props.title,
        height: 400,
        width: 500
    };

    return (
        <Plot
            data={[trace]}
            layout={layout}
        />
    );
};

export default PltPieChart;
