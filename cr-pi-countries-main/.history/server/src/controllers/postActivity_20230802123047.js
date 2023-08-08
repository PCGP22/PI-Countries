const { Country_Activity, Activity, Country } = require("../db.js")

async function postActivity (req,res){
    try{
        const { name, difficulty, duration, season, countryId } = await req.body
        const newActivity = {
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season,
        }

        await Activity.create(newActivity)
        const activity = await Activity.findAll({
            where: {
                name: name
            }
        })
        for(let country of countryId){
            let countryFound = await Country.findAll({
                where: {
                    id: country
                }
            })
            await Country_Activity.create({CountryId: countryFound[0].id, ActivityId: activity[0].id})
        }
        res.send("Actividad agregada exitosamente")
    }
    catch(error){
        res.status(500).send(error.message)
    }
}module.exports = {
    postActivity
}