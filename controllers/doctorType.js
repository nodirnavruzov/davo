const DoctorType = require('../models/doctorType')

module.exports.create = async (req, res) => {
  try {
    const { type } = req.body 
    const exsistsType = await DoctorType.findOne({ where: { type } });
    if (!exsistsType) {
      const docType = new DoctorType({type})
      await docType.save()
      res.status(200).json({message: `Type ${type} successfully created`})
    } else {
      res.status(200).json({message: `Type ${type} already exsists`})
    }
  } catch (error) {
    res.status(500).json({error: 'Somethink wrong'})
    console.log('Error', error)
  }
}
module.exports.typeByName = async (req, res) => {
  try {
    const { name } = req.query
    const foundType = await DoctorType.findOne({
      where: {
        type: name
      }
    })
    if (foundType) {
      res.status(200).json(foundType.deleteDates)
    } else {
      throw new Error('Doctor type not found')
    }
  } catch (error) {
    res.status(404).json({error: error.message})
    console.log('Error', error)
  }
}