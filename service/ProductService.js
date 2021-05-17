const mng = require('mongoose');
'use strict';

const productSchema = new mng.Schema({
  "@context": String,
  "@type": String,
  "@id" : String,
  name: String,
  description: String,
  price: String,
  productID: String,
  image: String,
  category: String
})

const Product = mng.model('Product', productSchema);


/**
 * Add a new product to the commerce's catalogue
 * 
 *
 * body Product Product object that needs to be added to the commerce's catalogue
 * no response value expected for this operation
 **/
exports.addProduct = async function (body) {
  const newProduct = new Product({
    "@context": "http://schema.org/",
    "@type": "Product",
    "@id": body.id,
    name: body.name,
    description: body.name,
    price: body.price,
    category: body.category
  })
  
  newProduct.save(function(err, newProduct){
    if (err) return console.error(err);
    console.log("Producto creado correctamente!");
    console.log(newProduct);
  });

}


/**
 * Delete product
 * This can only be done by the unused products.
 *
 * id String The id that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteProduct = function (id) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Get product by id
 * 
 *
 * id String The id that needs to be fetched.
 * returns Product
 **/
exports.getProductById = async function (id) {
  return products.filter(product => product.productID == id)

}

/**
 * Get products
 * 
 *
 * name String  (optional)
 * category String  (optional)
 * price String  (optional)
 * returns List
 **/
exports.getProducts = async function (name, category, maxPrice) {
  var productsFilter = products
  if (name != null) {
    productsFilter = productsFilter.filter(product => product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  }
  if (category != null) {
    productsFilter = productsFilter.filter(product => product.category.toLocaleLowerCase().includes(category.toLocaleLowerCase()))
  }
  if (maxPrice != null) {
    productsFilter = productsFilter.filter(product => parseInt(product.price) < parseInt(maxPrice))
  }
  return productsFilter;
}


/**
 * Updated product
 * 
 *
 * id String Product id that need to be updated
 * body Product Updated product object
 * no response value expected for this operation
 **/
exports.updateProduct = function (id, body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

