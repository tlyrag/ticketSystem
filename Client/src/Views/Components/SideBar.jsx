import { NavLink, useLocation } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation(); 

    // Placeholder user data, replace with real data as needed
    const user = {
        name: "John Doe",
        imageUrl: "/path-to-user-image.jpg" 
    };

    return (
        <div className="bg-purple text-white h-full border-purple-500 border-r-4 flex flex-col">
            {/* First Row: Header */}
            <div className="bg-purple p-5 flex-none">
                <h2 className="text-lg font-bold">Ticket System</h2>
                {/* Placeholder for logo image */}
                {/* <img src="/path-to-your-logo.png" alt="Logo" className="w-24 h-24 mt-3 mb-5" /> */}
            </div>

            {/* Second Row: User Profile and Navigation Buttons */}
            <div className="bg-white text-purple flex-grow flex flex-col">
                {/* User Profile */}
                <div className="flex flex-col items-center py-5">
                    <img src={user.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-purple-500"/>
                    <p className="mt-2 font-semibold">{user.name}</p>
                </div>

                {/* Navigation Menu */}
                <ul className="flex-grow space-y-4 p-5 overflow-y-auto">
                    <li>
                        <NavLink to="/" className={`block p-2 rounded ${location.pathname === '/' ? 'bg-purple text-white' : 'hover:bg-gray-200'}`}>
                            View Tickets
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-ticket" className={`block p-2 rounded ${location.pathname === '/new-ticket' ? 'bg-purple text-white' : 'hover:bg-gray-200'}`}>
                            New Ticket
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={`block p-2 rounded ${location.pathname === '/dashboard' ? 'bg-purple text-white' : 'hover:bg-gray-200'}`}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" className={`block p-2 rounded ${location.pathname === '/settings' ? 'bg-purple text-white' : 'hover:bg-gray-200'}`}>
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Third Row: Footer */}
            <div className="bg-purple p-5 flex-none">
                <p className="text-center text-sm">© 2024 Ticket System</p>
            </div>
        </div>
    );
};

export default SideBar;
