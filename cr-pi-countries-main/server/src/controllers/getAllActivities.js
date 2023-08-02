const { Activity, Country } = require("../db.js")

async function getAllActivities (req, res){
    try{
        const activities = await Activity.findAll({include:Country},)
        return res.send(activities)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAllActivities
}