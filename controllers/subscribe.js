const Patient = require('../models/patient')
const EventSubs = require('../models/eventSubs')
// const ReceptEvent = require('../models/receptEvent')
const ReceptTime = require('../models/receptTime')
const Recept = require('../models/recept')
const Pill = require('../models/pill')
const { Op} = require('sequelize')
const sequelize = require('../db/connection')


module.exports.create = async (req, res) => {
  try {
    const {telegram_id, phone, code} = req.body
    const updatedPatient = await Patient.update(
      {telegram_id},
      {
      where: {
        subscription_id: code,
        phone,
      }
    })
    if (updatedPatient[0]) {
      res.status(200).json({success: true})
    } else {
      res.status(404).json({success: false})
    }
  } catch (error) {
    res.status(500).json({
      error: 'Something wrong'
    })
  }
}

module.exports.eventTimesByEventId = async (req, res) => {
  try {
    
    const ids = req.body
    const foundEventTimes = await ReceptTime.findAll({
      where: {
        [Op.or]: ids
      },
      raw: true
    })
    res.status(200).json(foundEventTimes)
  } catch (error) {
    console.log('error',error)
    res.status(500).json({
      error: 'Something wrong'
    })
  }
}


module.exports.allSubs = async (req, res) => {
  try {
    /*
     SELECT patient.telegram_id, patient.name, patient.surname, rt.time, pill.name FROM patients patient INNER JOIN recepts recept ON recept.start_date='2022-06-08' INNER JOIN pills pill ON pill.id=recept.pill_id INNER JOIN recept_times rt ON rt.recept_id=recept.id
    */
    const recepts = await sequelize.query(`
    SELECT patient.telegram_id, patient.name AS patient_name, patient.surname AS patient_surname, rt.time, pill.name AS pill_name, recept.description AS recept_descr, recept.quantity AS pill_quantity FROM patients patient INNER JOIN recepts recept ON recept.end_date >= DATE(NOW()) INNER JOIN pills pill ON pill.id=recept.pill_id INNER JOIN recept_times rt ON rt.recept_id=recept.id`
    )
    res.status(200).json(recepts[0])
  } catch (error) {
    res.status(500).json({
      error: 'Something wrong'
    })
  }
}

module.exports.allSubsIds = async (req, res) => {
  try {
    const foundEventSubs = await EventSubs.findAll({
      attributes: ['telegram_id'],
      raw: true
    })
    const result = foundEventSubs.map(ids => { 
      return ids.telegram_id
    })
    if (result.length) {
      res.status(200).json({...result})
    } else {
      res.status(404).json('Not found')
    }
  } catch (error) {
    res.status(500).json({
      error: 'Something wrong'
    })
  }
}
