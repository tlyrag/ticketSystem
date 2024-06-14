const arInvoiceByCust =() => {
    return `SELECT TOP(2) 
    FORMAT(date_invoiced,'yyyy-MM') as invoice_date,
    invoice_id,
    cust_id_bill_to,
    date_due,
    job_id,
    invoice_total
    FROM DBO.arinvoiceheading
    WHERE system_id = 'WKG'
    AND cust_id_bill_to = @companyId
    ORDER by invoice_date desc`
}


export default {
    arInvoiceByCust
}