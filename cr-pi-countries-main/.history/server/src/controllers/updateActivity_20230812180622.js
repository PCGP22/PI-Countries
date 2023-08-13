const { Activity, Country, Country_Activity } = require("../db.js")


async function updateActivity (req, res){ 
    try{
        const id = req.params.idActivity
        const { name, difficulty, duration, season, countryId, imageURL, description } = await req.body
        await Activity.update({ 
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season,
            countryId: countryId,
            imageURL: imageURL? imageURL:null,
            description: description? description: null,
        }, {
            where: {
              id: id
            }
        });
        const activity = await Activity.findAll({
            where: {
                name: data.name
            }
        })
        for(let country of data.countryId){
            let countryFound = await Country.findAll({
                where: {
                    id: country
                }
            })
            let countryActivity = await Country_Activity.findAll({where:{
                CountryId: countryFound[0].id,
                ActivityId: activity[0].id
            }})
            if(countryActivity.length === 0){
                await Country_Activity.create({CountryId: countryFound[0].id, ActivityId: activity[0].id})
            }
        }
        const activities = await Activity.findAll({include:Country},)
        return res.send(activities)
    }
    catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = {
    updateActivity,
}