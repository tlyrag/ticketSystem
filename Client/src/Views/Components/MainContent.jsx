import TicketCards from "./TicketCards"
const MainContent = (props) => {
    
    return (
        <div className="h-full">
            <TicketCards Tickets={props.Tickets} isLoading={props.isLoading}/>
        </div>
    )
    }

export default MainContent