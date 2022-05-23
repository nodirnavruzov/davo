const { Router } = require('express')
const router = Router()
const { create, patientById } = require('../controllers/patient')
const { authenticateJWT } = require('../middleware/auth')
const { patientCreateValidationRules, patientByIdValidationRules } = require('../validator/patient')
const { validate } = require('../validator/index')
// const { patientAddress  } = require('../controllers/patientAddress')


// declare patient methods & routes  
router.get('/by-id', patientByIdValidationRules(), validate, patientById)
router.post('/create', patientCreateValidationRules(), validate, create)



module.exports = router;
