import TicketCards from "./TicketCards"
import FilterTicket from "./FilterTicket"
const MainContent = (props) => {
    
    return (
        <div className="h-full bg-white drop-shadow-3xl">
            <FilterTicket filterTickets={props.filterTickets} filterTicketByCreateDate={props.filterTicketByCreateDate } filterTicketByCompleteDate={props.filterTicketByCompleteDate}/>
            {props.hasTickets ? <TicketCards Tickets={props.Tickets} isLoading={props.isLoading} user={props.user}/> : <>No Ticket Found</>}
        </div>
    )
    }

export default MainContent