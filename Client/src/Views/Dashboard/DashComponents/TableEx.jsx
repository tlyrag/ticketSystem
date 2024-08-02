import React, { useState } from 'react';

const DataTable = ({ custData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filter, setFilter] = useState('');

    const filteredData = custData.filter(item =>
        Object.values(item).some(value =>
            String(value).toLowerCase().includes(filter.toLowerCase())
        )
    );

    // Calculate the current data slice
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages and dynamic page numbers
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const visiblePages = pageNumbers.filter(page => {
        return page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2);
    });

    return (
        <div className="m-5 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-between items-center py-2">

            </div>
            <table className="min-w-full leading-normal table-fixed">
                <thead>
                    <tr>
                        {currentItems.length > 0 && Object.keys(currentItems[0]).map(header => (
                            <th key={header} className="px-5 py-3 border-b-2 border-gray-200 bg-purple text-left text-xs font-semibold text-white bg-purple uppercase tracking-wider">
                                {header.replace(/_/g, ' ')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <input
                    type="text"
                    placeholder="Filter..."
                    value={filter}
                    onChange={e => {
                        setFilter(e.target.value);
                        setCurrentPage(1); // Reset to the first page with new filter
                    }}
                    className="p-2 border rounded"
                />
                
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            {Object.keys(item).map(header => (
                                <td key={header} className="px-5 py-2 border-b border-gray-200 bg-white text-sm truncate">
                                    {item[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-l-md">
                        First
                    </button>
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Prev
                    </button>
                    {visiblePages.map(number => (
                        <button key={number} onClick={() => setCurrentPage(number)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number ? 'bg-purple text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
                            {number}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="relative inline-flex items-center px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-r-md">
                        Last
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default DataTable;
