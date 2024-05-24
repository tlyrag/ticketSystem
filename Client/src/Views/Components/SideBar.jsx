import { NavLink } from 'react-router-dom';
const SideBar =() => {
    return (
            <div className="bg-purple text-white h-full">
               <div className="p-5">
                <h2 className="text-lg font-bold mb-5">Ticket System</h2>
                <ul className="space-y-4">
                    <li>
                        <NavLink to="/" className="block p-2 hover:bg-gray-700 rounded">
                            View Tickets
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-ticket" className="block p-2 hover:bg-gray-700 rounded">
                            New Ticket
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" className="block p-2 hover:bg-gray-700 rounded">
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </div>
            </div>
    )
}

export default SideBar