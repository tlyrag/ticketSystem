// import DataController from "../Controllers/DataController.js"
// import DBController from "../Controllers/DatabaseController.js"
// import StaticData from "../Model/StaticData.js"
import DBController from '../controller/DatabaseController.js'

export default(app) => {
    // Check if server is up and running
    app.get('/api/v1/health-check',(req,res) => {

        res.json({
            ok:true,
            data:{},
            msg:"Server is open and running."
        });
    });

    // app.get('/products/categories',async (req,res) => {
    
    //     try {
    //         const productsFromDb = await DBController.getAllProducts();
            
    //         const categoryList = await DataController.getCategoryLists(productsFromDb);
    //         res.json(categoryList)
    //     }
    //     catch(error) {
    //         res.json({
    //             ok:false,
    //             error:error
    //         })
    //     }

    // })

    app.get('/tickets',async (req,res) => {
        
        try {
            const tickets = await DBController.getAllTickets();
            res.json(tickets)
        }
        catch(error) {
            res.json({
                ok:false,
                error:error
            })
        }
  
    
    })

    app.get('/ticket/:id',async (req,res) => {
        const id = req.params.id;
        try {
            const ticket = await DBController.getTicketById(id);
            if (ticket) {
                res.json({
                    ok: true,
                    ticket: ticket
                });
            } else {
                // If no ticket is found, return a 404 Not Found response
                res.status(404).json({
                    ok: false,
                    message: `No ticket found with ID ${id}`
                });
            }
        } catch(error) {
            console.error("Error retrieving ticket:", error);

            // Return a 500 Internal Server Error response if an exception occurs
            res.status(500).json({
                ok: false,
                message: "Failed to retrieve ticket due to an internal error"
            });
        }
    })

    // app.get('/products/category/:category',async (req,res)=> {
    //     const category = req.params.category;
    //     try {
    //         const productsFromDb = await DBController.getAllProducts();
    //         const productList = await DataController.getProductByCategory(category,productsFromDb);
    //         res.json(productList)
    //     } catch(error) {
    //         res.json({
    //             ok:false,
    //             error:error
    //         })
    //     }
    // })

    app.post('/addTicket',async (req,res) => {
       
        try {
            console.log(req.body)
            await DBController.addTicket(req.body);
            res.status(200).json({
                ok: true,
                message: "Ticket added successfully"
            });
        }
        catch(error) {
            res.status(500).json({
                ok: false,
                message: "Failed to add ticket due to an internal error",
                error: error.message  // Optionally include error details or customize error messages based on the error type or environment
            });
        }
    })
    

}