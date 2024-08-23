import React from 'react';
import Plot from 'react-plotly.js';
import PltPieChart from '../TemplateCharts/PltPieChart';
import chartDataController from '../../../../Controller/chartDataController';


    
const PieChartInventoryByOwner = (props) => {
    let ownerInventory = chartDataController.aggregateById(props.data,"OWNER_IND","QTY ON HAND")

    let labels = Object.keys(ownerInventory)
    let values = Object.values(ownerInventory)

    return(<PltPieChart labels={labels} values = {values} title= 'Inventory Distribution by Owner'/>)
};

export default PieChartInventoryByOwner;
