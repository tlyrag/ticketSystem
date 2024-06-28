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

const custInventory = () => {
    return   `SELECT 
    PAP.CODE, 
    PAP.[INVENTORY CODE],
    CONCAT(PAP.DESCRIPTION1, PAP.DESCRIPTION2, PAP.DESCRIPTION3) AS Item_Description,
    J.date_promised, 
    j.job_id,
    J.po_number,
    j.mailing_qty,
    j.quantity_ordered,
    PAP.[QTY ON HAND],
    PAP.[COMMIT ON ORDER],
    PAP.[UNIT OF ISSUE] AS 'UOD QUANTITY',
    PAP.[UNIT ISSUE DESC] AS 'UOD DESCRIPTION',
    PAP.[REVISE DATE],
    PAP.[SELL PRICE] AS 'SELL PRICE',
    PAP.[SELL PRICE] * SUM(HST.QUANTITY) AS EXTENDED_SELL,
    SUM(HST.QUANTITY) AS QUANTITY_ON_ORDER
FROM 
    gams1.DBO.job j
INNER JOIN 
    PrintStreamLive.dbo.PAPSIZE pap ON j.inventory_item_id = CONCAT('PS', pap.CODE)
left JOIN 
    PrintStreamLive.DBO.STKHIST HST ON PAP.CODE = CAST(HST.[ITEM NO] AS VARCHAR)
    and  HST.MISJobNumber like concat(j.job_id,'%' )
WHERE
    pap.[CREDITOR RECNUM] = @companyId
    AND PAP.[QTY ON HAND] > 0
GROUP BY 
    PAP.CODE, 
    PAP.[INVENTORY CODE],
    PAP.DESCRIPTION1, 
    PAP.DESCRIPTION2, 
    PAP.DESCRIPTION3,
    J.date_promised, 
    j.job_id,
    J.po_number,
    j.mailing_qty,
    j.quantity_ordered,
    PAP.[QTY ON HAND],
    PAP.[COMMIT ON ORDER],
    PAP.[UNIT OF ISSUE],
    PAP.[UNIT ISSUE DESC],
    PAP.[REVISE DATE],
    PAP.[SELL PRICE]
`
}


export default {
    arInvoiceByCust,
    custInventory
}