const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');

routes.post('/user', UserController.save);
routes.get('/users', UserController.findAll);

routes.post('/user/:user_id/address', AddressController.save);
routes.get('/user/:user_id/address', AddressController.findAll);

routes.post('/user/:user_id/tech', TechController.save);
routes.get('/user/:user_id/tech', TechController.findAll);
routes.delete('/user/:user_id/tech', TechController.delete);

routes.get('/report', ReportController.show);

module.exports = routes;