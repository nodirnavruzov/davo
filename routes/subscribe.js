const { Router } = require('express')
const router = Router()
const { create, allSubs, allSubsIds, eventTimesByEventId, test } = require('../controllers/subscribe')




// declare subscribe methods & routes  
// router.get('/')
router.post('/', allSubs)
router.get('/ids', allSubsIds)
router.post('/create', create)
router.post('/event-times', eventTimesByEventId)
router.post('/test', test)

module.exports = router;
