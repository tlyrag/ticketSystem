const getApiUrl = (env) => {
    if(env==="local") {
        return "http://localhost:5847"
    }
    return "http://localhost:5847"
 
}

const tickets = () =>{
    return `${getApiUrl()}/tickets`
} 
const addTicket= () =>{
    return `${getApiUrl()}/addTicket`
} 
// const categoryApiUrl =() => {
//     return `${getApiUrl()}/products/categories`
// }

// const singleProductUrl = (id) => {
//     return `${getApiUrl()}/products/${id}`
// }
// const productByCategoryUrl =(category) => {
//     return `${getApiUrl()}/products/category/${category}`
// }




export default {
    getApiUrl,
    tickets,
    addTicket

}