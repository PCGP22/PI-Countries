const { Activity } = require("../db.js")

async function deleteActivities(id){
    try{
        if(!Activity.findAll({where: { id: id}})){
            return res.status(404).send("Not Found")
        }
        const activities = await Activity.destroy({
            where: {
                id: id
            }
        });
        return res.send(activities)
    }
    catch(error){
        res.status(500).send(error.message)
    }

}

module.exports = {
    deleteActivities
}