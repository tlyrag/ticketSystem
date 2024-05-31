const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    updateFilters();
};

// Handle change in end date
const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    updateFilters();
};

// Update filters based on current state
const updateFilters = () => {
    onFilterChange({
        searchTerm,
        startDate,
        endDate
    });
};

export default{
    handleStartDateChange,
    handleEndDateChange,
    updateFilters

}