import PltLineChart from "../TemplateCharts/PltLineChart"
import chartDataController from "../../../../Controller/chartDataController";
import React, { useDebugValue, useEffect, useState } from 'react';
const ExtendedSellChart = (props) => {


    let ExtcharData =chartDataController.aggregateDataByMonth(props.data);

    return (
        
       <PltLineChart data={ExtcharData} chart_title='Extended Sell Over Time' xAxis_tittle='Received Date' yAxis_tittle ='Extended Sell' xItem='date' yItem='sum'/>

    )
}

export default ExtendedSellChart