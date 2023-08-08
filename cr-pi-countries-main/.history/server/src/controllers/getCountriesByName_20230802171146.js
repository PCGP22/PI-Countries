const { Country, Activity } = require("../db.js")
const { Op } = require("sequelize");

async function getCountriesByName (req, res) {
    const name = req.query.name
    try{
       const country = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                }
            },
            include: Activity
       })
       if(country){
           return res.send(country)
       }
       return res.send("No encontrado")
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = {
    getCountriesByName
}