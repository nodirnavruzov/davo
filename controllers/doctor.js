const Doctor = require('../models/doctor');
const servicePassword = require('../service/password');
const { createToken } = require('../service/token');

module.exports.doctorById = async (req, res, next) => {
  try {
    const { id } = req.query
    const doctor = await Doctor.findOne({ 
      where: {
        id
      },
    })
    if (doctor) {
      delete doctor.password
      res.status(200).json(doctor)
    } else {
      throw new Error('Doctor not found')
    } 
  } catch (error) {
    res.status(404).json({
      Error: error.message
    })
  }
};

module.exports.allDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.findAll()
    const newDocs = doctor.map((doc) => { 
      delete doc.dataValues.password
      return doc
    })
    if (doctor) {
      res.status(200).json({data: newDocs})
    } else {
      throw new Error('No doctor found')
    } 
  } catch (error) {
    res.status(404).json({
      Error: error.message
    })
  }
};


module.exports.login = async (req, res, next) => {
  try { 
    const { phone, password } = req.body 
    let foundDoc = await Doctor.findOne({ 
      where: { 
        phone 
      } 
    }) 
    const compareResult = foundDoc 
      ? await servicePassword.comparePass({ password, hash: foundDoc.password }) 
      : false 
    if (compareResult) { 
      delete foundDoc.dataValues.password 
      const token = createToken({ ...foundDoc }) 
      res.status(200).json({ data: foundDoc, token }) 
    } else {
      res.status(401).json({ message: 'Phone or password wrong' })
    } 
  } catch (error) { 
      res.status(400).json({
        Error: error.message 
    }) 
  }
  // try {
  //   const { phone, password } = req.body
  //   let foundDoc = await Doctor.findOne({where: {
  //     phone
  //   }})
  //   if (foundDoc){
  //     const compareResult = await servicePassword.comparePass({password, hash: foundDoc.password})
  //     if (compareResult) {
  //       delete foundDoc.dataValues.password
  //       const token = createToken({ ...foundDoc})
  //       res.status(200).json({data: foundDoc, token})
  //     } else {
  //       res.status(401).json({message: 'Phone or password wrong'})
  //     }
  //   } else {
  //     res.status(401).json({message: 'Phone or password wrong'})
  //   }    
  // } catch (error) {
  //   res.status(400).json({
  //     Error: error.message
  //   })
  // }
};

module.exports.register = async (req, res, error) => {
  try {
    const { 
      name, 
      surname, 
      phone,
      hospital, 
      doctor_type, 
      password 
    } = req.body

    const existsDoctor = await Doctor.findOne({ 
      where: { 
        phone,
        name,
        surname
      }
    })

    if (!existsDoctor) {

      const hassPass = await servicePassword.hashPass(password)
      const doctor = new Doctor({
        name,
        surname,
        phone,
        hospital,
        doctor_type,
        password: hassPass
      })
      const { dataValues } = await doctor.save()
      delete dataValues.password
      res.status(200).json({data: dataValues, message: `Doctor: ${name} ${surname} successfully created`})
    } else {
      res.status(409).json({message: `Doctor: ${name} ${surname} allready exsists`})
    }
  } catch (error) {
    res.status(500).json({
      message: 'Somethink wrong'
    })
  }
};
