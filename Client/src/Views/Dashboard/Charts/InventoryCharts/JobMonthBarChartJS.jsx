import BarChart from "../TemplateCharts/CjBarChart";
import chartDataController from "../../../../Controller/chartDataController";
const JobBarChart = (props) => {

    const aggregateData = () => {
        const filteredData = props.data.filter(item => item.date_received); // Filter out entries without a valid date
    
        const aggregated = filteredData.reduce((acc, item) => {
            const date = new Date(item.date_received);
            if (!isNaN(date.getTime())) { // Check if the date is valid
                const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; // Create a year-month string
                acc[yearMonth] = (acc[yearMonth] || 0) + parseInt(item.qty, 10); // Aggregate quantity
            }
            return acc;
        }, {});
    
        const dates = Object.keys(aggregated).sort((a, b) => new Date(a) - new Date(b)); 
        const quantities = dates.map(date => aggregated[date]);
    
        return { dates, quantities };
    };
    
    let aggData  = aggregateData();




    console.log(aggData.quantities)

    const title = "Quantity Ordered by Month";

    return (
    <>
        <BarChart data ={aggData.quantities}  labels ={aggData.dates} chartTitle={title}/>
    </>)
}

export default JobBarChart