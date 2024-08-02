import React from 'react';
import Plot from 'react-plotly.js';
import PltPieChart from '../TemplateCharts/PltPieChart';
const PieChartInventoryByOwner = (props) => {
    // Aggregate data by OWNER_IND
    const ownerInventory = props.data.reduce((acc, item) => {
        acc[item.OWNER_IND] = (acc[item.OWNER_IND] || 0) + item['QTY ON HAND'];
        return acc;
    }, {});

    let labels = Object.keys(ownerInventory)
    let values = Object.values(ownerInventory)

    return(<PltPieChart labels={labels} values = {values} title= 'Inventory Distribution by Owner'/>)
};

export default PieChartInventoryByOwner;
