'use strict';

var utils = require('../utils/writer.js');
var Commerce = require('../service/CommerceService');

module.exports.addCommerce = function addCommerce (req, res, next) {
  var body = req.swagger.params['body'].value;
  Commerce.addCommerce(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCommerce = function deleteCommerce (req, res, next) {
  var id = req.swagger.params['id'].value;
  Commerce.deleteCommerce(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCommerceById = function getCommerceById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Commerce.getCommerceById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCommerces = function getCommerces (req, res, next) {
  var name = req.swagger.params['name'].value;
  Commerce.getCommerces(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCommerce = function updateCommerce (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Commerce.updateCommerce(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
