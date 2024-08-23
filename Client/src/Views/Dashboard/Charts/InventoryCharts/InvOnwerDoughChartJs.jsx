import CjDoughnutChart from "../TemplateCharts/CjDoughnutChart"
import chartDataController from "../../../../Controller/chartDataController"
const InvOwnerDoughChartJs = (props) => {
    let ownerInventory = chartDataController.aggregateById(props.data,"OWNER_IND","QTY ON HAND")

    let labels = Object.keys(ownerInventory)
    let values = Object.values(ownerInventory)

    return  (
        <CjDoughnutChart values ={values} labels ={labels} title= {"Inventory Distribution by Owner"}/>
    )
}

export default InvOwnerDoughChartJs