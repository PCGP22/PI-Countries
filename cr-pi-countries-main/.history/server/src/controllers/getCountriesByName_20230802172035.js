const { Country, Activity } = require("../db.js")
const { Op } = require("sequelize");

async function getCountriesByName (req, res) {
    const name = req.query.name
    try{
        if(!name){
            res.status(400).send("Falta añadir el nombre")
        }
       const country = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                }
            },
            include: Activity
       })
       if(country.length > 0){
           return res.send(country)
       }
       return res.status(404).send("No encontrado")
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = {
    getCountriesByName
}