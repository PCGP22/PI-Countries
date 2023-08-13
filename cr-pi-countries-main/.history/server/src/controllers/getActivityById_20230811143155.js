const { Country, Activity } = require("../db.js")

async function getActivityById (req, res) {
    console.log("controller")
    const id = req.params.idCountry
    try{
       const activity = await Activity.findAll({
            where: {
                id: id
            },
            include: Country
       })
       return res.send(activity)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = {
    getActivityById
}