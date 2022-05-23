const { Router } = require('express')
const router = Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const doctorRoutes = require('./doctor');
// const doctorAddressRoutes = require('./doctorAddress');
const doctorTypeRoutes = require('./doctorType');

const patientRoutes = require('./patient');
// const patientAddressRoutes = require('./patientAddress');

const pillsRoutes = require('./pill');

const visitRoutes = require('./visit');

const receptRoutes = require('./recept');

const visitReceptRoutes = require('./visitRecept');

const users = require('./users');


// declare routes 
// Doctor routes
router.use('/doctor', doctorRoutes);

// router.use('/doctor/address', doctorAddressRoutes);
router.use('/doctor/type', doctorTypeRoutes);

// Patient routes
router.use('/patient', patientRoutes);
// router.use('/patient/address', patientAddressRoutes);

// Pills routes
router.use('/pill', pillsRoutes);

// Visit routes
router.use('/visit', visitRoutes);

// Recept routes
router.use('/recept', receptRoutes);

// Visit recept routes
router.use('/visit-recept', visitReceptRoutes);

// Test routes
router.use('/users', users);

// Docs for Routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
