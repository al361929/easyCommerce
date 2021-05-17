const mng = require('mongoose');
'use strict';

const clientSchema = new mng.Schema({
  "@context": String,
  "@type": String,
  "@id" : String,
  name: String,
  username: String,
  lastName: String,
  password: String,
  telephone: String,
  email: String
})

const Client = mng.model('Client', clientSchema);

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = async function(body) {
  const newUser = new Client({
    "@context": "http://schema.org/",
    "@type": "Person",
    "@id": body.id,
    name: body.name,
    username: body.username,
    lastName: body.lastName,
    password: body.password,
    telephone: body.phone,
    email: body.email
  })
  
  newUser.save(function(err, newUser){
    if (err) return console.error(err);
    console.log("Usuario creado correctamente!");
    console.log(newUser);
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = async function(username) {
  await Client.findOneAndDelete({username: username}).then((data) => {
    console.log("Cliente eliminado!");
    console.log(data);
  });
}


/**
 * Get user by user name
 * 
 *
 * username String The name that needs to be fetched.
 * returns User
 **/
exports.getUserByName = async function(username) {
  var cliente;
  await Client.findOne({username: username}).then((data) => {
      cliente = data;
  });
  return cliente;
}


/**
 * Get users
 * 
 *
 * username String  (optional)
 * returns List
 **/
exports.getUsers = async function(username) {
  if(username != null){
    return users.filter(user => user.username.toLocaleLowerCase().includes(username.toLocaleLowerCase()))
  }else{
    return users;
  }
}


/**
 * Logs user into the system
 * 
 *
 * username String The user name for login
 * password String The password for login
 * returns String
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in user session
 * 
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = async function(username, body) {
  var filter = {username: username};
  const updateUser = new Client({
    "@context": "http://schema.org/",
    "@type": "Person",
    "@id": body.id,
    name: body.name,
    username: body.username,
    lastName: body.lastName,
    password: body.password,
    telephone: body.phone,
    email: body.email
  })
  
  await Client.findOneAndUpdate(filter, updateUser).then((data) => {
    console.log("Cliente actualizado!")
  });
}

