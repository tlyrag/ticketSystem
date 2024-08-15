const NotFoundPage = (props) => {
    return (
            
        <div className="h-full flex flex-col items-center justify-center bg-white text-gray-800">
            <div className="text-center p-10">
                {props.status!=500 ? 
                    <p className="text-lg mb-6">
                        <h1 className="text-4xl font-bold mb-4">{`${props.status}- ${props.dataName.toUpperCase()} Not Found`}</h1>
                        Sorry, 
                        <b>{` ${props.dataName.toUpperCase()}:${props.dataValue.toUpperCase()} `}</b> 
                        didn't return any results.
                        <br/>
                        {`Please check for any typos, or the data selected in your filter options`}
                    </p> 
                :  
                
                    <>
                        <p className="text-lg mb-6">
                            <h1 className="text-4xl font-bold mb-4">{`${props.status}- Internal Server Error`}</h1>
                            Sorry, 
                            <b>{` ${props.dataName.toUpperCase()}:${props.dataValue.toUpperCase()} `}</b> 
                            A server ran into an error or this function might not be ready yet
                        </p> 
                    </>}

            </div>
        </div>
    );
};

export default NotFoundPage;
