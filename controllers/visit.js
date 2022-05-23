const Visit = require('../models/visit')

module.exports.create = async (req, res) => {
  try {
    const { patient_id, doctor_id, visit_date, complaints } = req.body
    
    const visit = new Visit({ ...req.body })
    const visitResult = await visit.save()
    res.status(200).json({data: visitResult.id, message: 'Visit created'})
  } catch (error) {
    res.status(500).json({
      error: 'Somethink wrong'
    })
  }
}