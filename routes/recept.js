const { Router } = require('express')
const router = Router()
const { create } = require('../controllers/recept')




// declare recept methods & routes  
// router.get('/')
router.post('/create', create)

module.exports = router;
