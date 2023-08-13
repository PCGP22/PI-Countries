const { Activity } = require("../db.js")

async function deleteActivities(req,res){
    try{
        const id = req.params.idActivity
        if(!Activity.findAll({where: { id: id}})){
            return res.status(404).send("Not Found")
        }
        await Activity.destroy({
                where: {
                    id: id
                }
            }, 
            { force: true }
        );
        const activities = await Activity.findAll({include:Country},)
        return res.send(activities)
    }
    catch(error){
        res.status(500).send(error.message)
    }

}

module.exports = {
    deleteActivities
}