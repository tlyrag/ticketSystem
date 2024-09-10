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
const custInventory =() => {
    return `
        with inventory as (
	SELECT
		PAP.[INVENTORY CODE] as item_id,
		CONCAT(PAP.DESCRIPTION1, PAP.DESCRIPTION2, PAP.DESCRIPTION3) AS Item_Description,
		CASE SUBSTRING(RLS.notes,0,2)
			WHEN 'Q' THEN FORMAT(J.date_promised,'yyyy-MM-dd')
			ELSE FORMAT(RLS.[DATE RECEIVED],'yyyy-MM-dd')
		END AS date_received,
		CASE
			WHEN j.sub_job_id='' THEN concat(j.job_id,'_',0)
			ELSE concat(j.job_id,'_',j.sub_job_id)
		END AS docket,
		J.po_number,
			CASE 
				WHEN RIGHT(rls.location, 2) = '-C' THEN 'C' 
    			WHEN PAP.[ACTIVITY CODE]='9000003' THEN 'D'
    			WHEN PAP.[ACTIVITY CODE]='9000001' THEN 'C'
    		ELSE ' ' 
		END AS OWNER_IND,
		CASE POP
			WHEN 'P' Then 'Yes'
			ELSE  'No'
		END as is_print_on_demand,
		CASE pap.ACTIVE
			WHEN 'Y' THEN 'N'
			ELSE 'Y'
		END AS Obsolete,
		sum(QTY) AS qty,
		CONCAT(PAP.[UNIT OF ISSUE],'/',PAP.[UNIT ISSUE DESC] ) as unit_qty,
		PAP.[SELL PRICE] AS 'unit_sell',
		ROUND(PAP.[SELL PRICE] * sum(QTY),2) AS subtotal
	FROM 
	-- Was right left changed to inner inner
		gams1.DBO.job j
	INNER JOIN 
		PrintStreamLive.dbo.PAPSIZE pap ON j.inventory_item_id = CONCAT('PS', pap.CODE)
	INNER JOIN 
		PrintStreamLive.DBO.STKROLLS as RLS ON RLS.[PAPSIZE RECNUM]= pap.[DATAFLEX RECNUM ONE]
		and RLS.MISJobNumber like concat(j.job_id,'%')
	--inner join  PrintStreamLive.dbo.AR_Customer ar
	--on ar.AR_CustomerID =pap.[CREDITOR RECNUM]

	WHERE
		--AR_CustomerACNO = 'govalb'
		pap.[CREDITOR RECNUM] = (
			select ar.AR_CustomerID
			from PrintStreamLive.dbo.AR_Customer ar
			where AR_CustomerACNO = @companyid
		)
		--and pap.[INVENTORY CODE] = 'LM-99DEC115'
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
		sub_job_id,
		--ar.AR_CustomerACNO,
		POP,
		rls.location,
		pap.[LAST ORDER DATE],
		ACTIVE -- if y not obsolete
	--ORDER BY PAP.[QTY ON HAND] DESC,[INVENTORY CODE]
),
Last_release AS (
	SELECT 
		FORMAT(CREATED_DATE,'yyyy-MM-dd') AS last_release_date,
		INVENTORY_CODE,
		ROW_NUMBER() OVER (PARTITION BY INVENTORY_CODE ORDER BY CREATED_DATE DESC) AS rn
	FROM PrintStreamLive.dbo.SO_LINE_ITEM
	WHERE INVENTORY_CODE in (
		SELECT item_id
		from inventory
	)
--ORDER BY CREATED_DATE DESC
)

SELECT 
	item_id,
	Item_Description,
	date_received,
	docket,
	po_number,
	OWNER_IND,
	is_print_on_demand,
	Obsolete,
	unit_qty,
	qty,
	unit_sell,
	subtotal,
	last_release_date
FROM 
	inventory as inv
INNER JOIN Last_release AS lr ON lr.INVENTORY_CODE=inv.item_id
WHERE rn =1
    `
}
const custInventory_old = () => {
    return   `SELECT
    PAP.CODE, 
    PAP.[INVENTORY CODE],
    CONCAT(PAP.DESCRIPTION1, PAP.DESCRIPTION2, PAP.DESCRIPTION3) AS Item_Description,
    --FORMAT(J.date_promised,'yyyy-MM-dd') as monarch_promisse_date, 
	--FORMAT(RLS.[DATE RECEIVED],'yyyy-MM-dd') as printstream_receive_date,
	--SUBSTRING(RLS.notes,0,2) as isQ,
	CASE SUBSTRING(RLS.notes,0,2)
		WHEN 'Q' THEN FORMAT(J.date_promised,'yyyy-MM-dd')
		ELSE FORMAT(RLS.[DATE RECEIVED],'yyyy-MM-dd')
	END AS actual_received_date,
    j.job_id,
    J.po_number,
    j.quantity_ordered,
        CASE 
        WHEN RIGHT(rls.location, 2) = '-C' THEN 'C' 
    	WHEN PAP.[ACTIVITY CODE]='9000003' THEN 'D'
    	WHEN PAP.[ACTIVITY CODE]='9000001' THEN 'C'
    	ELSE ' ' 
    END AS OWNER_IND,
	CASE POP
	WHEN 'P' Then 'Yes'
	ELSE  'No'
	END as is_print_on_demand,
    sum(QTY) AS QUANTITY_ON_ORDER,
    PAP.[QTY ON HAND],
    PAP.[COMMIT ON ORDER],
    PAP.[UNIT OF ISSUE] AS 'UOD QUANTITY',
    PAP.[UNIT ISSUE DESC] AS 'UOD DESCRIPTION',
    --FORMAT(PAP.[REVISE DATE],'yyyy-MM-dd') as revise_date,
    PAP.[SELL PRICE] AS 'SELL PRICE',
    ROUND(PAP.[SELL PRICE] * sum(QTY),2) AS EXTENDED_SELL
FROM 
-- Was right left changed to inner inner
    gams1.DBO.job j
INNER JOIN 
    PrintStreamLive.dbo.PAPSIZE pap ON j.inventory_item_id = CONCAT('PS', pap.CODE)
INNER JOIN 
	PrintStreamLive.DBO.STKROLLS as RLS ON RLS.[PAPSIZE RECNUM]= pap.[DATAFLEX RECNUM ONE]
	and RLS.MISJobNumber like concat(j.job_id,'%')
--inner join  PrintStreamLive.dbo.AR_Customer ar
--on ar.AR_CustomerID =pap.[CREDITOR RECNUM]

WHERE
	--AR_CustomerACNO = 'govalb'
	pap.[CREDITOR RECNUM] = (
		select ar.AR_CustomerID
		from PrintStreamLive.dbo.AR_Customer ar
		where AR_CustomerACNO = @companyid
	)
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
	--ar.AR_CustomerACNO,
	POP,
    rls.location
ORDER BY PAP.[QTY ON HAND] DESC,[INVENTORY CODE]
`
}


export default {
    arInvoiceByCust,
    custInventory
}