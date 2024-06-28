
import DBController from '../controller/DatabaseController.js'
import SqlController from '../controller/SqlServerController.js';
import QuantumServerController from '../controller/QuantumServer.Controller.js';

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
                res.status(200).json({
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
    
    app.patch('/completeTicket/:id',async (req,res) => {
       
        try {
            const id = req.params.id;
            console.log(id)
            await DBController.completeTicket(id);
            res.status(200).json({
                ok: true,
                message: "Ticket Completed successfully"
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
    
    app.patch('/cancelTicket/:id',async (req,res) => {
       
        try {
            const id = req.params.id;
            await DBController.cancelTicket(id);
            res.status(200).json({
                ok: true,
                message: "Ticket Cancelled successfully"
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

    app.patch('/assignTicket/:id',async (req,res) => {
       
        try {
            const id = req.params.id;
            const user = req.body.user
            
            await DBController.assignToMe(id,user);
            res.status(200).json({
                ok: true,
                message: "Ticket Assigned successfully"
            });
        }
        catch(error) {
            res.status(500).json({
                ok: false,
                message: "Failed to add ticket due to an internal error",
                error: error.message  
            });
        }
    })
    app.patch('/addComment/:id' , async(req,res) => {
        try {
          
            const id = req.params.id;
            const comment = {
                user:req.body.user.name,
                message:req.body.message
            }
            await DBController.addComment(id,comment);
            res.status(200).json({
                ok: true,
                message: "Added Comment successfully"
            });
        } catch (error)    {
            res.status(500).json({
                ok: false,
                message: "Failed to add comment due to an internal error",
                error: error.message 
            }) 
        }
    })

    app.get('/getPoLines/:companyId',async (req,res) => {
        try {
            const companyId = req.params.companyId
            let pos = await SqlController.getPoLines(companyId);
            res.status(200).json({
                ok:true,
                poLines:pos
            })
        } catch (err) {
            res.status(500).json({
                ok:false,
                message:"Failed to Get Data",
                error: err.message
            })
        }
    })
    app.get('/getPSinventory/:companyId',async (req,res) => {
        try {
            const companyId = req.params.companyId
            let inventory = await SqlController.getCustInventory(companyId)
            return res.status(200).json({
                ok:true,
                InvResult:inventory
            })
        } catch (err) {
        return  res.status(500).json({
                ok:false,
                message:"Failed to Get Data",
                error: err.message
            })
        }
    })

    app.get('/getInventory/:companyId', async (req, res) => {
        try {
            const companyId = req.params.companyId;
            const system = req.query.system;
    
            console.log(`Company ID: ${companyId}, System: ${system}`);
    
            let inventory = await QuantumServerController.runInventory(companyId, system);
    
            //console.log(result);
            res.status(200).json({
                ok: true,
                InvResult: inventory
            });
        } catch (err) {
            console.error("Error fetching inventory:", err);
            res.status(500).json({
                ok: false,
                message: "Failed to Get Data",
                error: err.message
            });
        }
    });

    

}

