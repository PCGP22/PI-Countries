const { Country, Activity } = require("../db.js")

async function getCountriesById (req, res) {
    console.log("controller")
    const id = req.params.idPais
    try{
       const country = await Country.findAll({
            where: {
                id: id
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
    getCountriesById
}