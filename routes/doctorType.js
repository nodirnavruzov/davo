const { Router } = require('express')
const router = Router()
const { create, typeByName  } = require('../controllers/doctorType')
const { doctorTypeCreateValidationRules, doctorTypeByNameValidationRules } = require('../validator/doctorType')
const { validate } = require('../validator/index')

router.get('/by-name', doctorTypeByNameValidationRules(), validate, typeByName)
router.post('/create', doctorTypeCreateValidationRules(), validate, create)

module.exports = router;
