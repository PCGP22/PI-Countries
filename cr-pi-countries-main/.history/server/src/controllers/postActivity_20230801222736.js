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
        const country = await Country.findAll({
            where: {
                id: countryId
            }
        })
        await Activity.create(newActivity)
        const activity = await Activity.findAll({
            where: {
                name: name
            }
        })
        await Country_Activity.create({CountryId: country[0].id, ActivityId: activity[0].id})
        res.end()
    }
    catch(error){
        res.status(500).send(error.message)
    }
}module.exports = {
    postActivity
}