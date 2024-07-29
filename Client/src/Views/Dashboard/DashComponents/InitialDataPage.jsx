const InitialDataPage = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-white text-gray-800">
            <div className="text-center p-10">
                <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
                <p className="text-lg mb-6">It looks like you don't have any data to display yet.</p>
                <p className="text-lg mb-6">Get started by selecting your parameters and running your report.</p>
            </div>
        </div>
    );
};

export default InitialDataPage;