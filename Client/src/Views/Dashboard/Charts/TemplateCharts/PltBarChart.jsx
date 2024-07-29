import React from 'react';
import Plot from 'react-plotly.js';
import { DefaultTooltipContent } from 'recharts';


const PltBarChart = (props) => {
    return (
        <Plot
        data={[

          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={{width: 720, height: 640, title: 'A Fancy Plot'}}
      />
    )
}

export default PltBarChart;
