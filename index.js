'use strict';

var fs = require('fs'),
path = require('path'),
http = require('http');

const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')  
const jsonld = require('jsonld');  

var app = express();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;

/*******  EXTENSIONES NO SWAGGER ********/
const sse  = require('./utils/notifications');
const { addProduct } = require('./service/ProductService');

//Ponemos en marcha el listener de eventos
sse.start()

app.use(cors())

//Contenido estático
app.use('/web',  express.static('public'))

//Registramos el stream de eventos
app.use('/news', sse.eventStream)

//Pasamos el listener de eventos por el objeto req a los controladores
app.use((req, res, next) => {req.sse = sse.emitter; next()})

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    console.log('Front-end is available on http://localhost:%d/web', serverPort);

  });

  // DATABASE
  const mng = require('mongoose')
  //ATLAS: modifica los datos de la cadena de conexión con tu configuración en la nube
  const my_conn = "mongodb+srv://Borjalo:Borjalo123@cluster0.ilxdc.mongodb.net/EasyCommerce?retryWrites=true&w=majority"
  // Creamos la conexión con la base de datos
  mng.connect(my_conn, {useNewUrlParser: true, useUnifiedTopology: true}); 
  const db = mng.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Conectados a la base de datos!!")
    // we're connected!
  });


  // IMPORT DATA
  // var Product = require('../easyCommerce/service/ProductService');
  // const csv = require('csv-parser')
  // const fs = require('fs')
  // const results = [];
  // var i = 0;

  // fs.createReadStream('data.csv')
  //   .pipe(csv())
  //   .on('data', (data) => {
  //     Product.addProduct(data);
  //   })
  //   .on('end', () => {
  //     console.log(results);
  // });

});
