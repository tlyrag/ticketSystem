import React, { useState,useEffect } from 'react';

const DataTable = (props) => {
    useEffect(() => {
        
    }, []);
    const getHeaders = (items) => {
        if (items.length > 0) {
            return Object.keys(items[0]);
        }
        return [];
    };

    const headers = getHeaders(props.custData);

    return(
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            {header.replace(/_/g, ' ')}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.custData.map((item, index) => (
                    <tr key={index}>
                        {headers.map(header => (
                            <td key={header} className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                {item[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default DataTable;