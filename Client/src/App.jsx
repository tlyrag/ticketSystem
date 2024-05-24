
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

    useEffect(() => {
      const fetchTicket = async () => {
        let ticks = await apiController.fetchAllTickets();
        setTickets(ticks);
        setisLoading(false);
    
      }

      fetchTicket();
    }, [Tickets]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex">
      <Router>
        <div className="w-2/12">
       
          <Sidebar />
        </div>
        <div className="w-10/12 p-4"> 
        <Routes>
            <Route path="/" element={<MainContent Tickets={Tickets} isLoading={isLoading}/>} />
            <Route path="/new-ticket" element={<NewTicket/>} />
          </Routes>
        </div>
        </Router>
      </div>
    </div>
  )
}

export default App
