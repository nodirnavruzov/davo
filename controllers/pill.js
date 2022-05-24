const Pill = require('../models/pill')

module.exports.create = async (req, res) => {
  try {
    const { name, type } = req.body
    const foundPill = await Pill.findOne({
      where: {
        name,
        type
      }
    })
    if (!foundPill) {
      const pill = new Pill({...req.body})
      await pill.save()
      res.status(200).json({message: `Pill ${name} ${type} successfully created!`})
    } else {
      res.status(200).json({message: `Pill ${name} ${type} allready exsists!`})
    }
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({
      Error: 'Something wrong!'
    })
  }
}

module.exports.allPills = async (req, res) => {
  try {
    const allPills = await Pill.findAll()
    if (allPills.length) {
      res.status(200).json({ data: allPills })
    } else {
      res.status(404).json({ message: 'No pills'})
    }
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({
      Error: 'Something wrong!'
    })
  }
}

module.exports.byName = async (req, res) => {
  try {
    const { name } = req.query
    const foundPill = await Pill.findOne({
      where: {
        name
      }
    })
    if (foundPill) {
      res.status(200).json(foundPill)
    } else {
      res.status(404).json({ message: `Pill with name ${name} is not exsists`})
    }
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({
      Error: 'Something wrong!'
    })
  }
}

module.exports.byId = async (req, res) => {
  try {
    const { id } = req.query
    const foundPill = await Pill.findOne({
      where: {
        id
      }
    })
    if (foundPill) {
      res.status(200).json(foundPill)
    } else {
      res.status(404).json({ message: `Pill with name ${id} is not exsists`})
    }
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({
      Error: 'Something wrong!'
    })
  }
}
