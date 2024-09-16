
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Views/Components/SideBar';  
import MainContent from './Views/Components/MainContent';  
import NewTicket from './Views/Pages/NewTicket';
import { useState,useEffect } from 'react';
import apiController from './Controller/apiController';

function App() {
  
  const [Tickets, setTickets] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [hasTickets, sethasTickets] = useState(false);
  
  
  const fetchTicket = async () => {
    let ticks = await apiController.fetchAllTickets();
    setTickets(ticks);
    setisLoading(false);
    sethasTickets(true);

  }


  const filterTicket = async (searchterm) => {
    const lowercasedSearch = searchterm.toLowerCase();
    console.log(lowercasedSearch);
    let filteredTickets = Tickets.filter(ticket => {
      
      let title = ticket.title.toLowerCase().includes(lowercasedSearch);
      let descriptiopn = ticket.description.toLowerCase().includes(lowercasedSearch);

       if(title || descriptiopn) {
         return true
       }
       return false

    }) 
    
    if(filteredTickets.length>1) {
      setTickets(filteredTickets)
      sethasTickets(true)
    } else {
      await fetchTicket();
      sethasTickets(false)
    }

  }

  const filterTicketByCreateDate = async (createDate) => {
    
    let dateFilteredtickets = Tickets.filter(ticket=> {
      console.log(ticket)  
      let ticketDate = new Date(ticket.creationDate);
      let filterDate = new Date(createDate);
      return ticketDate>=filterDate;
    })

    if(dateFilteredtickets.length>1) {
      setTickets(dateFilteredtickets)
      sethasTickets(true)
    } else {
      await fetchTicket();
      sethasTickets(false)
    }
  }



  const filterTicketByCompleteDate = async (completeDate) => {
    
    let dateFilteredtickets = Tickets.filter(ticket=> {
      
      let ticketDate = new Date(ticket.completionDate);
      let filterDate = new Date(completeDate);
      return ticketDate<=filterDate;
    })

    if(dateFilteredtickets.length>1) {
      setTickets(dateFilteredtickets)
      sethasTickets(true)
    } else {
      await fetchTicket();
      sethasTickets(false)
    }
  }
    useEffect(() => {
      fetchTicket();
    }, []);


  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex">
      <Router>
        <div className="w-2/12">
       
          <Sidebar />
        </div>
        <div className="w-10/12 p-4 bg-pink"> 
        <Routes>
            <Route path="/" element={ 
              <MainContent 
                Tickets={Tickets} 
                isLoading={isLoading} 
                filterTickets={filterTicket} 
                hasTickets={hasTickets} 
                filterTicketByCreateDate={filterTicketByCreateDate}
                filterTicketByCompleteDate={filterTicketByCompleteDate}
              /> 
            }/>
            <Route path="/new-ticket" element={<NewTicket fetchTicket= {fetchTicket}/>} />
          </Routes>
        </div>
        </Router>
      </div>
    </div>
  )
}

export default App
