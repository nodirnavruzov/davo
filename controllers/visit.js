const Visit = require('../models/visit')

module.exports.create = async (req, res) => {
  try {
    const visitResult = await Visit.create({ ...req.body })
    res.status(201).json({id: visitResult.id, message: 'Visit created'})
  } catch (error) {
    res.status(500).json({
      error: 'Somethink wrong'
    })
  }
}

module.exports.visitsByPatient = async (req, res) => {
  try {
    const patient_id = req.query.id
    const patientVisits = await Visit.findAll({
      where: {
        patient_id
      }
    })
    if (patientVisits.length) {
      res.status(200).json({ data: patientVisits })
    } else {
      res.status(404).json({ message: 'No patient visits' })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Somethink wrong'
    })
  }
}

module.exports.doctorVisits = async (req, res) => {
  try {
    const doctor_id = req.query.id
    const doctorVisits = await Visit.findAll({
      where: {
        doctor_id
      }
    })
    if (doctorVisits.length) {
      res.status(200).json({ data: doctorVisits })
    } else {
      res.status(404).json({ message: 'No doctor visits' })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Somethink wrong'
    })
  }
}


module.exports.visitById = async (req, res) => {
  try {
    const { id } = req.query
    const visit = await Visit.findOne({
      where: {
        id
      }
    })
    if (visit) {
      res.status(200).json(visit)
    } else {
      res.status(404).json({ message: `Visit with ${id} is not exsists` })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Somethink wrong'
    })
  }
}
