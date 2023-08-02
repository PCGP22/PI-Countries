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
       return res.send(country)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = {
    getCountriesByName
}