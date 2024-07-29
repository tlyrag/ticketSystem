import React from 'react';

const DashBoardMain = () => {
    return (
        <div className="h-full bg-white drop-shadow-3xl m">
            <div className="flex flex-col items-center justify-center w-full p-4 min-h-screen">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to Westkey Reoports!</h1>
                    <p className="text-xl text-gray-600">Managing your data has never been easier.</p>
                    <button className="mt-4 bg-purple text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashBoardMain;
