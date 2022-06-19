//call all the required packages
const express = require('express');

//create express app
const app = express();
const routerProducts = express.Router();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); 
app.use('/api/productos', routerProducts);

routerProducts.use(express.json()); //body parser (put)
routerProducts.use(express.urlencoded({extended: true}));

//memory persistence support
let products = [];

//API RESTful
routerProducts.get('', (req,res) => {
    res.send(products)
});

routerProducts.get('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    if(!isNaN(id)){
        if(id > 0 && id <= products.length){
            const product = products.find(product => product.id == id)
            res.send(product)
        }else{
            res.send({
                error: 'Product not found.'
            })
        }
    }else{
        res.send({
			error: "Parameter is not a number.",
		})
    }
});

routerProducts.post('', (req,res) => {
    const product = req.body
    product.id = products.length + 1
    products.push(product)
    res.send(product)
});

routerProducts.put('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const productUpdated = req.body
    if(!isNaN(id)){
        if(id > 0 && id <= products.length){
            let product = products.find(product => product.id == id)
            product.title = productUpdated.title
            product.price = productUpdated.price
            product.thumbnail = productUpdated.thumbnail
            res.send(product)
        }else{
            res.send({
                error: 'Product not found.'
            })
        }
    }else{
        res.send({
            error: "Parameter is not a number.",
        })
    }
});

routerProducts.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    if(!isNaN(id)){
        if(id > 0 && id <= products.length){
            const product = products.find(product => product.id == id)
            products = products.filter(product => product.id != id)
            res.send(product)
        }else{
            res.send({
                error: 'Product not found.'
            })
        }
    }else{
        res.send({
            error: "Parameter is not a number.",
        })
    }
});


//listen to server
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
});

//error handling
server.on('error', error => console.log(`Server error ${error}`));