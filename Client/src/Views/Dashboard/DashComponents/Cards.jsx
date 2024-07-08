const SummaryCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-5 m-2 w-64 text-center">
            <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-purple-600">{value}</p>
        </div>
    );
};

export default SummaryCard
