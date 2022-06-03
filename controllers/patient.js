const Patient = require('../models/patient')
const { generateShorID } = require('../utils/id')

module.exports.create = async (req, res) => {
  try {
    const userId = generateShorID()
    const { dataValues } = await Patient.create({...req.body, subscription_id: userId})
    res.status(201).json({data: dataValues, message: `Patient ${dataValues.name} ${dataValues.surname} successfully created`})
  } catch (error) {
    console.log('error', error)
    res.status(404).json({
      message: error.message
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

