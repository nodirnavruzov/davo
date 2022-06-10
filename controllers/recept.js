const Recept = require('../models/recept')
const VisitRecept = require('../models/visitRecept')
const Visit = require('../models/visit')
const ReceptTime = require('../models/receptTime')
const sequelize = require('../db/connection');

module.exports.create = async (req, res) => {
	let transaction
	try {
		transaction = await sequelize.transaction()
		const body = req.body

		const { 
			pill_id, 
			patient_id, 
			doctor_id, 
			time,
			quantity, 
			description,
			visit_id
		} = body

		const visitData = await Visit.findOne({
			where: {
				id: visit_id
			}
		})
   		//  const savedEvent = await ReceptEvent.create({
			// ...time
    	// }, { transaction })
    
		const savedRecept = await Recept.create({
			pill_id,
			patient_id,
			doctor_id,
			start_date: time.start_date,
			end_date: time.end_date,
			quantity,
			description,
		}, { transaction })
		
		//* need optimization if possible
		for (const eventTime of time.times) {
			await ReceptTime.create({time: eventTime, recept_id: savedRecept.id }, { transaction })
		}

		await VisitRecept.create({
			patient_id,
			visit_id: visitData.id,
			doctor_id,
			recept_id: savedRecept.id
		}, { transaction })

    	await transaction.commit()
		
    	res.status(201).json({ message: 'Recept created'})
    
	} catch (error) {

		if(transaction) {
			await transaction.rollback()
		}
		console.log(error)
		res.status(500).json({Error: 'Something wrong!'})
	}
}