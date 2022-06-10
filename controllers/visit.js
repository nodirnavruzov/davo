const Visit = require('../models/visit')
const Patient = require('../models/patient')
const Doctor = require('../models/doctor')
const sequelize = require('../db/connection');

module.exports.create = async (req, res) => {
  try {
    const visitResult = await Visit.create({ ...req.body })
    res.status(201).json({id: visitResult.id, message: 'Visit created'})
  } catch (error) {
    res.status(500).json({
      error: 'Something wrong'
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
    console.log('error', error)
    
    res.status(500).json({
      error: 'Something wrong'
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
      error: 'Something wrong'
    })
  }
}


module.exports.visitById = async (req, res) => {
  try {
    const { id } = req.query
    const visit = sequelize.query(`
      SELECT
        patient.name AS patient_name,
        doctor.name AS doctor_name
      FROM
        visits visit
      INNER JOIN doctors doctor ON doctor.id=visit.doctor_id
      INNER JOIN patients patient ON patient.id=visit.patient_id
      WHERE visit.id=${id}
    `)
    if (visit) {
      res.status(200).json(visit)
    } else {
      res.status(404).json({ message: `Visit with ${id} is not exsists` })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Something wrong'
    })
  }
}
