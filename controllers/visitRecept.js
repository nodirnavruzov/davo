const VisitRecept = require('../models/visitRecept')

module.exports.create = async (req, res) => {
  try {

  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      Error: 'Somethink wrong!'
    })
  }
}