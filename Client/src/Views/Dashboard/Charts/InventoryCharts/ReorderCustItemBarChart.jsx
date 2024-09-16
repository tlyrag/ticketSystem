import BarChart from "../TemplateCharts/CjBarChart";
import chartDataController from "../../../../Controller/chartDataController";
const ReorderCustItemChart = (props) => {


 const data =   chartDataController.aggregateDataByParams(props.CLIENT_ID,QTD_BELOW_MIN)





    const title = "";

    return (
    <>
        <BarChart data ={data.params1}  labels ={data.params2} chartTitle={title}/>
    </>)
}

export default ReorderCustItemChart