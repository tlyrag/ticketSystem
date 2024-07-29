const NotFoundPage = (props) => {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-white text-gray-800">
            <div className="text-center p-10">
                <h1 className="text-4xl font-bold mb-4">{`404 - ${props.dataName.toUpperCase()} Not Found`}</h1>
                <p className="text-lg mb-6">
                    Sorry, 
                    <b>{` ${props.dataName.toUpperCase()}:${props.dataValue.toUpperCase()} `}</b> 
                    didn't return any results.
                </p>
                <p className="mb-8">{`Please check for any typos, or the data selected in your filter options`} </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
