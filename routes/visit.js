const { Router } = require('express')
const router = Router()
const { visitCreateValidationRules, visitByIdValidationRules } = require('../validator/visit')
const { validate } = require('../validator/index')
const { 
  create,
  visitsByPatient,
  doctorVisits,
  visitById
} = require('../controllers/visit')



// SELECT  patients.id, name, doctors.id, name FROM patients INNER JOIN doctors ON patients.id, name = doctors.id, name;

// declare visit methods & routes  
// router.get('/', patientAddress)
router.get('/by-patient', visitsByPatient)
router.get('/doctor', doctorVisits)
router.get('/by-id', visitByIdValidationRules(), validate, visitById)
router.post('/create', visitCreateValidationRules(), validate, create)

module.exports = router;
