const aggregateDataByMonth = (data, dateParam, id) => {
    const aggregate = {};

    data.forEach(item => {
        if (item[dateParam]) { // Ensure the date parameter is present
            const date = new Date(item[dateParam]);
            if (!isNaN(date.getTime())) { // Check if the date is valid
                const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Format as 'YYYY-MM'
    
                if (!aggregate[monthKey]) {
                    aggregate[monthKey] = 0;
                }
                // Add value from the specified ID, ensuring it's a number
                aggregate[monthKey] += parseFloat(item[id]) || 0;
            }
        }
    });

    let aggregatedArray = Object.entries(aggregate).map(([date, sum]) => ({
        date,
        sum
    }));
    
    // Sort the final data array based on the date strings
    let finalData = aggregatedArray.sort((a, b) => a.date.localeCompare(b.date));
    return finalData;
};


const generateDataAndLabels = (data,newDatakey,labelKey) => {
    let newData = []
    let label = []

    for(let arg in data) {
        newData.push(data[arg][newDatakey])
        label.push(data[arg][labelKey])
    }

    return {
        newdata:newData,
        label:label
    }

}

const aggregateById = (data,label,id) => {
    const ownerInventory = data.reduce((acc, item) => {
        acc[item.OWNER_IND] = (acc[item[label]] || 0) + item[id];
        return acc;
    }, {});
    return ownerInventory
}
const aggregateDataByParams = (param1,param2) => {

        const result = data.reduce((acc, item) => {
            if (acc[item[param1]]) {
                acc[item[param1]][param2] += item[pram2];
            } else {
                acc[item[param1]] = { ...item }; // Spread operator to copy properties
            }
            return acc;
        }, {});
    
        
        // Convert object to array of items and array of quantities
        const params1 = [];
        const params2 = [];
    
        Object.values(result).forEach(item => {
            params1.push(item[param1]);
            params2.push(item[param2]);
        });
    
        return { params1, params2 };
};
    





export default{
    aggregateDataByMonth,
    generateDataAndLabels,
    aggregateById,
    aggregateDataByParams
    

}