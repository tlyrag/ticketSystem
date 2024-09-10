import React from 'react';

const ReportsTable = () => {

    const heads = ["name","description","location","system","outputFolder"]
    const reports = [
        {
            name: "Inventory Variance Summary",
            description: "Provides the Summary Variance on the Inventory Items Between Monarch and PrintStream",
            location: "Dashboard > Administration Tab",
            system:"Monarch/PrintStream",
            outputFolder:"P:\\Reports\\testing\\Outputs\\Administration"
        },
        {
            name: "Inventory Variance Detail",
            description: "Provides the Detail Variance on the Inventory Items Between Monarch and PrintStream",
            location: "Dashboard > Administration Tab",
            system:"Monarch/PrintStream",
            outputFolder:"P:\\Reports\\testing\\Outputs\\Administration"
        },
        {
            name: "Inventory",
            description: "Provides the Inventory report showing the jobs and quantity on hands by item",
            location: "Dashboard > Inventory Tab",
            system:"Quantum and Monarch/PrintStream",
            outputFolder:"P:\\Reports\\testing\\Outputs\\Inventory"
        },
        {
            name: "Inventory",
            description: "Provides the Inventory report showing the jobs and quantity on hands by item",
            location: "Dashboard > Inventory Tab",
            system:"Quantum and Monarch/PrintStream",
            outputFolder:"P:\\Reports\\testing\\Outputs\\Inventory"
        },
        {
            name: "Reorder Notice",
            description: "Generates a pdf for Items below minimum level",
            location: "Dashboard > Sales Tab > Reorder Notice",
            system: "Quantum and Monarch/PrintStream",
            outputFolder:"P:\\Reports\\testing\\Outputs\\ReorderNotice"
        },
        {
            name: "Back Order Notice",
            description: "Provides the orders that were placed on backorder",
            location: "Dashboard > Sales Tab > Client Back Order",
            system: "Quantum and Monarch/PrintStream",
            outputFolder:""
        },        
        {
            name: "Job Receive Status",
            description: "Provides the Status of Job",
            location: "Dashboard > FGoods > Job Receive Status",
            system: "Monarch/PrintStream",
            outputFolder:"P:\\Reports\\testing\\Outputs\\job_receive_status"
        },

    ];

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    {heads.map((ths, index) => (
                        <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-purple  text-xs font-semibold text-left text-white uppercase tracking-wider">
                            {ths}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {reports.map((report, index) => (
                    <tr key={index}>
                        {heads.map((ths) => (
                            <td key={`${index}-${ths}`} className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-left ">
                                {report[ths]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default ReportsTable;
