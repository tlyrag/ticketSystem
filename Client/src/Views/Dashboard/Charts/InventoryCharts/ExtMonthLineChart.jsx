import PltLineChart from "../TemplateCharts/PltLineChart"
import React, { useDebugValue, useEffect, useState } from 'react';
const ExtendedSellChart = (props) => {

    
    const aggregateDataByMonth = (data) => {
        const aggregate = {};
    
        data.forEach(item => {
            const date = new Date(item.actual_received_date);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as 'YYYY-M'
    
            if (!aggregate[monthKey]) {
                aggregate[monthKey] = 0;
            }
            aggregate[monthKey] += parseFloat(item.EXTENDED_SELL) || 0;
        });
    
        let aggregatedArray = Object.entries(aggregate).map(([date, sum]) => ({
            date,
            sum
        }));

        return aggregatedArray.sort((a, b) => a.date.localeCompare(b.date));
    };

    let ExtcharData =aggregateDataByMonth(props.data);

    return (
        
       <PltLineChart data={ExtcharData} chart_title='Extended Sell Over Time' xAxis_tittle='Received Date' yAxis_tittle ='Extended Sell' xItem='date' yItem='sum'/>

    )
}

export default ExtendedSellChart