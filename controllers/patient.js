const Patient = require('../models/patient')

module.exports.create = async (req, res) => {
  try {
    const { name, surname, phone } = req.body

    const foundPatient = await Patient.findOne({where: {
      name,
      surname,
      phone
    }})
    
    if (foundPatient) {
      await Patient.update({ ...req.body }, { where: {
        name,
        surname,
        phone
      }})

      res.status(200).json({message: `Patient ${name} ${surname} successfully Updated`})
    } else {
      const patient = new Patient({...req.body})
      const values = await patient.save()
      res.status(200).json({data: values, message: `Patient ${name} ${surname} successfully created`})
    }
  } catch (error) {
    res.status(404).json({
      message: error
    })
  }
}

module.exports.patientById = async (req, res) => {
  try {
    const { id } = req.query  
    const foundPatient = await Patient.findOne({
      where: {
        id
      }
    })
    if (foundPatient) {
      res.status(200).json(foundPatient)
    } else {
      throw new Error('Patient not found')
    }
  } catch (error) {
    res.status(404).json({
      error: error.message
    })
  }
}