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
const custNumber = (AR_) => {
    return ``
}
const custInventory = () => {
    return   `SELECT
    PAP.CODE, 
    PAP.[INVENTORY CODE],
    CONCAT(PAP.DESCRIPTION1, PAP.DESCRIPTION2, PAP.DESCRIPTION3) AS Item_Description,
    FORMAT(J.date_promised,'yyyy-MM-dd') as monarch_promisse_date, 
	FORMAT(RLS.[DATE RECEIVED],'yyyy-MM-dd') as printstream_receive_date,
	--SUBSTRING(RLS.notes,0,2) as isQ,
	CASE SUBSTRING(RLS.notes,0,2)
		WHEN 'Q' THEN FORMAT(J.date_promised,'yyyy-MM-dd')
		ELSE FORMAT(RLS.[DATE RECEIVED],'yyyy-MM-dd')
	END AS actual_received_date,
    j.job_id,
    J.po_number,
    j.quantity_ordered,
        CASE PAP.[ACTIVITY CODE]
    	WHEN '9000003' THEN 'D'
    	WHEN '9000001' THEN 'C'
    	ELSE ' ' 
    END AS OWNER_IND,
	CASE POP
	WHEN 'P' Then 'Print On Demand'
	ELSE  'N'
	END as is_print_on_demand,
    sum(QTY) AS QUANTITY_ON_ORDER,
    PAP.[QTY ON HAND],
    PAP.[COMMIT ON ORDER],
    PAP.[UNIT OF ISSUE] AS 'UOD QUANTITY',
    PAP.[UNIT ISSUE DESC] AS 'UOD DESCRIPTION',
    FORMAT(PAP.[REVISE DATE],'yyyy-MM-dd') as revise_date,
    PAP.[SELL PRICE] AS 'SELL PRICE',
    PAP.[SELL PRICE] * sum(QTY) AS EXTENDED_SELL
FROM 
    gams1.DBO.job j
right JOIN 
    PrintStreamLive.dbo.PAPSIZE pap ON j.inventory_item_id = CONCAT('PS', pap.CODE)
left JOIN 
	PrintStreamLive.DBO.STKROLLS as RLS ON RLS.[PAPSIZE RECNUM]= pap.[DATAFLEX RECNUM ONE]
	and RLS.MISJobNumber like concat(j.job_id,'%')
inner join  PrintStreamLive.dbo.AR_Customer ar
on ar.AR_CustomerID =pap.[CREDITOR RECNUM]

WHERE
	AR_CustomerACNO =@companyid


GROUP BY 
   PAP.CODE, 
    PAP.[INVENTORY CODE],
    CONCAT(PAP.DESCRIPTION1, PAP.DESCRIPTION2, PAP.DESCRIPTION3),
    J.date_promised, 
	RLS.[DATE RECEIVED],
    j.job_id,
    J.po_number,
    j.mailing_qty,
    j.quantity_ordered,
    PAP.[QTY ON HAND],
    PAP.[COMMIT ON ORDER],
    PAP.[UNIT OF ISSUE],
    PAP.[UNIT ISSUE DESC],
    PAP.[REVISE DATE],
    PAP.[SELL PRICE],
	PAP.[ACTIVITY CODE],
	j.cust_id_bill_to,
	SUBSTRING(RLS.notes,0,2),
	[DEBTOR RECNUM],
	[CREDITOR RECNUM],
	ar.AR_CustomerACNO,
	POP
ORDER BY JOB_ID,[INVENTORY CODE]
`
}


export default {
    arInvoiceByCust,
    custInventory
}