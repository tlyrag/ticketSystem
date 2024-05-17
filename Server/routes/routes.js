// import DataController from "../Controllers/DataController.js"
// import DBController from "../Controllers/DatabaseController.js"
// import StaticData from "../Model/StaticData.js"


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

    // app.get('/products',async (req,res) => {
    //     const limit = req.query.limit;
    //     try {
    //         const productsFromDb = await DBController.getAllProducts();
    //         const productList = await DataController.getProductList(limit,productsFromDb);
    //         res.json(productList)
    //     }
    //     catch(error) {
    //         res.json({
    //             ok:false,
    //             error:error
    //         })
    //     }
  
    
    // })

    // app.get('/products/:id',async (req,res) => {
    //     const id = req.params.id;
    //     try {
    //         const productsFromDb = await DBController.getAllProducts();
    //         const product = await DataController.getProduct(id,productsFromDb);
    //         res.json(product)
    //     } catch(error) {
    //         res.json({
    //             ok:false,
    //             error:error
    //         })
    //     }
    // })

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

    // app.post('/addtocart/:id',async (req,res) => {
    //     const params =req.params.id;

    //     try {
    //         console.log("Calling Add to Cart APi")
    //         const product = await DBController.getProductById(req.params.id);
    //         console.log("got here 1")
    //         await DBController.addToCart(product);
    //         console.log("got here 2")
    //     }
    //     catch(error) {
    //         console.log("Failed to add product to Cart")
    //     }
    // })

}