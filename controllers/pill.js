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