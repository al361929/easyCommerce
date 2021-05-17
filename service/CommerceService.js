const mng = require('mongoose');
'use strict';

const commerceSchema = new mng.Schema({
  "@context": String,
  "@type": String,
  "@id" : String,
  cif: String,
  id: String,
  name: String,
  password: String,
  username: String
});

const Commerce = mng.model('Commerce', commerceSchema);

/**
 * Add a new commerce
 * 
 *
 * body Commerce Commerce object that needs to be added.
 * no response value expected for this operation
 **/
exports.addCommerce = async function (body) {

  const newCommerce = new Commerce({
    "@context": "http://schema.org/",
    "@type": "",
    "@id" : String,
    cif: body.cif,
    id: body.id,
    name: body.name,
    password: body.password,
    username: body.username
  })
  
  newCommerce.save(function(err, newCommerce){
    if (err) return console.error(err);
    console.log("Comercio creado correctamente!");
    console.log(newCommerce);
  });
}


/**
 * Delete commerce
 * 
 *
 * id String The id that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteCommerce = function (id) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Get commerce by id
 * 
 *
 * id String The id that needs to be fetched.
 * returns Commerce
 **/
 exports.getCommerceById = async function(id) {
  return Commerces.filter(commerce => commerce.id == id)
}



/**
 * Get commerces
 * 
 *
 * name String  (optional)
 * returns List
 **/
exports.getCommerces = async function (name) {
  if(name != null){
    return Commerces.filter(commerce => commerce.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  }else{
    return Commerces;
  }
}


/**
 * Updated commerce
 * The commerce needs to exist.
 *
 * id String Commerce id that need to be updated
 * body Commerce Updated commerce object
 * no response value expected for this operation
 **/
exports.updateCommerce = function (id, body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

