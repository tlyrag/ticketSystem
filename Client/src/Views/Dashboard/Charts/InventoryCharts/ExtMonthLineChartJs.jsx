import CjsLineChart from "../TemplateCharts/CjsLineChart";
import chartDataController from "../../../../Controller/chartDataController";

const ExtMonthLineChartJs = (props) => {

    let data = chartDataController.aggregateDataByMonth(props.data);
    let newData= chartDataController.generateDataAndLabels(data,"sum","date")
   
    

    return(
        <>
            <CjsLineChart data = {newData.newdata} labels = {newData.label} title={"Extended Sell Over Time"} />
        </>
    )

}

export default ExtMonthLineChartJs;