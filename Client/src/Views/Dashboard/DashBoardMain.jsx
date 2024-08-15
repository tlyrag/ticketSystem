import React from 'react';
import ReportsTable from './DashComponents/AvailableDash';
const DashBoardMain = () => {
    return (
        <div className="h-full bg-white drop-shadow-3xl m">
            <div className="flex flex-col items-center justify-center w-full p-4 min-h-screen">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to Westkey Reports!</h1>
                    <p className="text-xl text-gray-600">Managing your data has never been easier.</p>
                    <ReportsTable/>
                </div>
            </div>
        </div>
    );
}

export default DashBoardMain;
