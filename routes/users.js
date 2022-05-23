const { Router } = require('express')
const router = Router()

/* GET test listing. */
router.get('/', function(req, res, next) {
  res.status(200).json([
    {
      name: 'John',
      surname: 'Connor'
    },
    {
      name: 'Michael',
      surname: 'Jeckson'
    },
    {
      name: 'Mike',
      surname: 'Tyson'
    },
  ]);
})
module.exports = router;
