import Excel from 'exceljs';
import ExcelConstants from '../Constants/ExcelConstants.js';

const generateExcelFile = async (query,data, filename) => {

    // Create a new workbook and add a worksheet
    try {
        console.log(filename)
        let outputPath = ExcelConstants.outputPath(filename);
        console.log("Here")
        let workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(ExcelConstants.templatePath(query));
        let worksheet = workbook.getWorksheet(ExcelConstants.sheetName);
    
        if (!worksheet) {
            console.log('Sheet not found');
            return;
        }
    
    
        if (worksheet.actualRowCount > 1) {
            worksheet.spliceRows(2, worksheet.actualRowCount - 1);
        }
    
    
        data.forEach((item, index) => {
            console.log(item)
            worksheet.addRow(item);
        });
    
        // Save the workbook
        await workbook.xlsx.writeFile(outputPath);
        console.log('Excel file saved to', outputPath);
        return outputPath
    }
    catch (err) {
        console.log(`Failed to generate excel ${err}`)
    }
 
}


const excelController = {
    generateExcelFile
}

export default excelController