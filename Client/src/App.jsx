
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Views/Components/SideBar';  
import MainContent from './Views/Components/MainContent';  
import NewTicket from './Views/Pages/NewTicket';
import { useState,useEffect } from 'react';
import apiController from './Controller/apiController';
import Inventory from './Views/Dashboard/InventoryDash'
import Sales from './Views/Dashboard/SalesDash';
import DashBoardMain from './Views/Dashboard/DashBoardMain';
import FgoodsDash from './Views/Dashboard/FgoodsDash';
import FulfillmentDash from './Views/Dashboard/FulfillmentDash';
import Administration from './Views/Dashboard/AdministrationDash';

/// to be replaced once login is created
const loggedUser = {
  name: "John Doe",
  imageUrl: "/path-to-user-image.jpg" 
};



function App() {
  
  const [Tickets, setTickets] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [hasTickets, sethasTickets] = useState(false);
  const [user, setuser] = useState("");
  const [isHome, setisHome] = useState(true);

  const changeSideBar = (home) => {
    setisHome(home);
  }
  
  const fetchTicket = async () => {
    let ticks = await apiController.fetchAllTickets();
    setTickets(ticks);
    setuser(loggedUser)
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
      console.log()
      // fetchTicket();
    }, []);


  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex">
      <Router>
        <div className="w-2/12">
          <Sidebar user={user} isHome={isHome} changeSideBar={changeSideBar}/>
        </div>
        <div className="w-10/12 p-4 bg-pink"> 
        <Routes>
            <Route path="/" 
              // element={ 
              //   <MainContent 
              //     Tickets={Tickets} 
              //     isLoading={isLoading} 
              //     filterTickets={filterTicket} 
              //     hasTickets={hasTickets} 
              //     filterTicketByCreateDate={filterTicketByCreateDate}
              //     filterTicketByCompleteDate={filterTicketByCompleteDate}
              //     user={user}
              //   /> 
              // }
              element={<DashBoardMain  user={user}/>}
            />
            <Route path="/new-ticket" element={<NewTicket fetchTicket= {fetchTicket} user={user}/>} />
            <Route path="/inventory" element={<Inventory  user={user}/>} />
            <Route path="/sales" element={<Sales  user={user}/>} />
            <Route path="/administration" element={<Administration  user={user}/>} />
            <Route path="/fgoods" element={<FgoodsDash  user={user}/>} />
            <Route path="/fulfillment" element={<FulfillmentDash  user={user}/>} />
            <Route path="/dashboard" element={<DashBoardMain  user={user}/>} />
          </Routes>
        </div>
        </Router>
      </div>
    </div>
  )
}

export default App
