import { NavLink, useLocation } from 'react-router-dom';

const homeLinks = ["inventory","sales"]; //,"New-ticket","It-Inventory"
const dashBoardLinks = ["inventory","sales"];
const LinkCreator = (props) => {
    return (
        <div className="bg-white text-purple flex-grow flex flex-col transition duration-150 ease-in-out">
        {/* User Profile */}
        {/* <div className="flex flex-col items-center py-5">
            <img src={props.user.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-purple-500"/>
            <p className="mt-2 font-semibold">{props.user.name}</p>
        </div> */}

        {/* Navigation Menu */}
        <ul className="flex-grow space-y-4 p-5 overflow-y-auto" >
            <li key='home'>
                <NavLink 
                    to="/" 
                    className={`block p-2 rounded ${location.pathname === '/' ? 'bg-purple text-white' : 'hover:bg-gray-200'}`}
                    onClick ={ ()=> props.changeSideBar(true)}
                    
                >
                    Home
                </NavLink>
            </li>
            {props.links.map(link=> {
                return (            
                    <li key={`${link}`}>
                        <NavLink 
                            to={`/${link}`} 
                            className={`block p-2 rounded ${location.pathname.toLocaleLowerCase() === `/${link.toLowerCase()}` ? 'bg-purple text-white' : 'hover:bg-gray-200'}`}
                            onClick = {() => {
                                if(link=="dashboard")  {props.changeSideBar(false)}
                            }}
                            
                        >
                            {`${link.charAt(0).toUpperCase() + link.slice(1)}`}
                        </NavLink>
                    </li>
                )
            })}
        </ul>
    </div>
    )
};
const SideBar = (props) => {
    const location = useLocation(); 

    // Placeholder user data, replace with real data as needed


    return (
        <div className="bg-purple text-white h-full border-purple-500 border-r-4 flex flex-col">
            {/* First Row: Header */}
            <div className="bg-purple p-5 flex-none">
                <h2 className="text-lg font-bold">Westkey Reports</h2>
                {/* Placeholder for logo image */}
                {/* <img src="/path-to-your-logo.png" alt="Logo" className="w-24 h-24 mt-3 mb-5" /> */}
            </div>

            {/* Second Row: User Profile and Navigation Buttons */}
            {props.isHome ? <LinkCreator links = {homeLinks} changeSideBar = {props.changeSideBar} user ={props.user}/> :<LinkCreator links={dashBoardLinks} user = {props.user} changeSideBar = {props.changeSideBar}/>}

            {/* Third Row: Footer */}
            <div className="bg-purple p-5 flex-none">
                <p className="text-center text-sm">© 2024 Westkey Reports</p>
            </div>
        </div>
    );
};

export default SideBar;
