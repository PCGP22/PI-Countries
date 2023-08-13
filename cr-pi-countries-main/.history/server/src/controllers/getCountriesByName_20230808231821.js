const { Country, Activity } = require("../db.js")
const { Op } = require("sequelize");

async function getCountriesByName (req, res) {
    const name = req.query.name
    const regexpName = /^[A-Z]+$/i
    try{
        if(!name){
            return res.status(400).send("Please write a search term")
        }
        else if(!regexpName.test(name)){
            return res.status(400).send("Search term must be plain text")
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
       return res.status(404).send("No countries match the search term")
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = {
    getCountriesByName
}