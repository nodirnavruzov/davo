const { Router } = require('express')
const router = Router()
const { allDoctors, doctorById, register, login  } = require('../controllers/doctor')
const { validate } = require('../validator/index')
const { 
  doctorByIdValidationRules, 
  doctorRegisterValidationRules,
  doctorLoginValidationRules,
} = require('../validator/doctor')




// declare doctor methods & routes  
router.get('/', allDoctors)
router.get('/by-id', doctorByIdValidationRules(), validate, doctorById)
router.post('/register', doctorRegisterValidationRules(), validate, register)
router.post('/login', doctorLoginValidationRules(), validate, login)

module.exports = router;
