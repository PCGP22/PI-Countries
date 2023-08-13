const { Activity, Country } = require("../db.js")


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