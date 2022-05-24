const { Router } = require('express')
const router = Router()
const { create, allPills, byName, byId } = require('../controllers/pill')
const { 
  pillCreateValidationRules,
  pillByNameValidationRules,
  pillByIdValidationRules
 } = require('../validator/pill')
const { validate } = require('../validator/index')



// declare pill methods & routes  
router.get('/', allPills)
router.get('/by-name', pillByNameValidationRules(), validate, byName)
router.get('/by-id', pillByIdValidationRules(), validate, byId)
router.post('/create', pillCreateValidationRules(), validate, create)



module.exports = router;
