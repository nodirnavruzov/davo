const { Router } = require('express')
const router = Router()
const { create  } = require('../controllers/pill')




// declare pill methods & routes  
// router.get('/', patientAddress)
router.post('/create', create)



module.exports = router;
