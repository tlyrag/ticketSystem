import mongoose from "mongoose";
import dbModel from "../Model/DatabaseProductModel.js"
import testList from "../Model/StaticData.js"
import 'dotenv/config'




const connect = async () => {
    try {
        
        await mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    }
    catch(error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

const getAllProducts = async () =>{;
    const product = await dbModel.Product.find()
    return product
    }
const getProductById = async (id) =>{
   
    const product = await dbModel.Product.findOne({id:id})
    return product
} 

const addToCart = async (item) => {
    const { title, price, image } = item;
    const productId = item.id;
    console.log(item)
    const newItem = new dbModel.Cart({
        productId,
        title,
        price,
        image
        })
    console.log(newItem)
        await newItem.save().catch(err=> console.log(`Error saving data: ${err}`));
       
}

const createData  = async () => {
    testList.data.forEach(async product => {
        const id = product.id;
        const title = product.title;
        const price = product.price;
        const description= product.description;
        const category = product.category;
        const image = product.image;
        const rating = product.rating;
        
        const newProduct = new dbModel.Product({
            id,
            title,
            price,
            description,
            category,
            image,
            rating
        })
        
        await newProduct.save();
        
    })
    
}

const mongodb ={
    connect,
    getAllProducts,
    createData,
    addToCart,
    getProductById
}
export default  mongodb
