const express = require('express');
const app = express();
const port = 8080;

const users = [
    {id:1, user_name:"paridhi"},
    {id:2, user_name:"raja"},
    {id:3, user_name:"dinesh"},
    {id:4, user_name:"john"},
    {id:5, user_name:"justin"},
]

const products = [
    {id:1, prod_name:"iphone 11"},
    {id:2, prod_name:"samsung s25"},
    {id:3, prod_name:"mi 11"},
    {id:4, prod_name:"moto g15"},
    {id:5, prod_name:"nokia 1100"},
]

app.get('/', (req, res) =>{
    res.send({messge: "Root"});
})

//user query params
app.get('/api/users', (req, res)=>{
    const {query:{filter,value}} = req;
    console.log(filter,value);
    if(filter && value){
        return res.send(users.filter((user)=>user[filter].includes(value)))
    }
    res.send(users);
})

//product query params
app.get('/api/products', (req, res)=>{
    const {query:{filter,value}} = req;
    console.log(filter,value);
    if(filter&&value){
        return res.send(products.filter((product)=> product[filter].includes(value)))
    }
    res.send(products);
})

//user route params
app.get('/api/users/:id', (req, res) =>{
    // console.log(req.params);
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send({messge:"Bad Request, Invalid ID"});
    const user = users.find((user)=> user.id === id)
    if(user) return res.send(user);
    res.status(400).send({messge:"User Not Found"});
})

//product route params
app.get('/api/products/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.status(400).send({messge:"Bad Request, Invalid ID"});
    const product = products.find((product)=> product.id === id)
    if (product) return res.send(product);
    res.status(400).send({messge:"Product Not Found"})
})

app.listen(port, ()=>{
    console.log(`The the server is running in http://localhost:${port}`);
}); 