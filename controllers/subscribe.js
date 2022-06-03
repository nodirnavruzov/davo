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
    const body = req.body
    console.log('body', body)
    
    const foundPac = await Patient.findOne({
      where: {
        subscription_id: body.code,
        phone: body.phone
      }
    })
    console.log('foundPac', foundPac)
    
    if (foundPac) {
      await EventSubs.create({
        telegram_id: body.telegram_id,
        patient_id: foundPac.id
      })
      res.status(200).json({name: foundPac.name, surname: foundPac.surname})
    } else {
      res.status(404).json('Not found')
    }
  } catch (error) {
    res.status(500).json({
      error: 'Somethink wrong'
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
      error: 'Somethink wrong'
    })
  }
}

module.exports.test = async (req, res) => {
  try {
    const body = req.body
    console.log('body', body)
    
    // const myData = await sequelize.query(`select p.name, p.surname from receptevents e INNER JOIN recepteventtimes t on e.id=t.recept_event_id INNER JOIN recepts r on e.id=r.recept_event_id inner join patients p on r.patient_id=p.id where e.id=1`, { raw: true })
    // console.log('myData', myData)
    // Recept.findAll({
    //   where: {
    //     [Op.or]: body.ids,
    //   },
    //   raw: true
    // })
    res.status(200).json()
  } catch (error) {
    console.log('error',error)
    res.status(500).json({
      error: 'Somethink wrong'
    })
  }
}

module.exports.allSubs = async (req, res) => {
  try {
    const foundEventSubs = await EventSubs.findAll({raw:true})
    const { start_date, end_date} = req.body
    const allRecept = await Recept.findAll({
      where: {
        start_date: { 
          [Op.lte]: start_date,

        },
        end_date: { 
          [Op.gte]: start_date
        },
      },
      attributes: ['id'],
    })
    const ids = allRecept.map(ids => {
      return ids.id
    })
    console.log('ids', ids)
    
    const recTime = await ReceptTime.findAll({
      where: {
        recept_id: ids 
      },
      raw: true
    })
    res.status(200).json({recepts: allRecept, event_times: recTime})
    // if (foundEventSubs.length) {
    //   res.status(200).json({eventSubs: foundEventSubs, allRecepts: allRecept})
    // } else {
    //   res.status(404).json('Not found')
    // }
  } catch (error) {
    res.status(500).json({
      error: 'Somethink wrong'
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
      error: 'Somethink wrong'
    })
  }
}
