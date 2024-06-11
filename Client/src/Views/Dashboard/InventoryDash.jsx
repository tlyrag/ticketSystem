import InventoryBarChart from "./InventoryCharts/InventoryBarChart";

const Inventory =() => {
    return (
    <div className="h-full bg-white drop-shadow-3xl grid grid-rows-3 grid-flow-col gap-4 m-15">
           <div className="grid grid-cols-2 gap-4 ">
                <div><InventoryBarChart/></div> 
                <div><InventoryBarChart/></div> 
            </div> 
           
    </div>
    )
}

export default Inventory;