const { Country_Activity, Activity, Country } = require("../db.js")

async function postActivity (req,res){
    try{
        const data = await req.body
        console.log(data)
        const newActivity = {
            name: data.name,
            difficulty: data.difficulty,
            duration: data.duration,
            season: data.season,
            countryId: data.countryId,
            imageURL: data.imageURL? data.imageURL:null,
            description: data.description? data.description: null,
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