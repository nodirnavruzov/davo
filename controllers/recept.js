const Recept = require('../models/recept')
const visitRecept = require('../models/visitRecept')

module.exports.create = async (req, res) => {
  try {
    const { visitData } = req.body
    const { receptData } = req.body
    const visData = new visitRecept(visitData)
    const recData = new Recept(receptData)
    await visData.save()
    await recData.save()
    res.status(200).json({message: 'Recent created'})
  } catch (error) {
    res.status(500).json({Error: 'Somethink wrong!'})
  }
}