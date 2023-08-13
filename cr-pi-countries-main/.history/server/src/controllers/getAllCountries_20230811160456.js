const countries = require("../../api/db.json")
const { Country, Activity } = require("../db.js")
let allCountries = []

async function getAllCountries (req, res) {
    try{
        const dbCountries =  await Country.findAll()
        console.log(dbCountries)
        for(let country of countries.countries){
            const { cca3, name, flags, continents, capital, subregion, area, population } = country
            let countryToAdd = {
                id: cca3,
                offName: name.official,
                name: name.common,
                image: flags.png,
                continent: continents.join(", "),
                capitalCity: typeof capital !== "undefined"? capital.join(", "): "N/A",
                subregion: subregion? subregion: "N/A",
                area: area,
                population: population
            }
            allCountries.push(countryToAdd)
            if(dbCountries.length < 15){return res.send(dbCountries)}{
                Country.create({...countryToAdd, include: Activity})
            }
        }
        return res.send(allCountries)
    }
    catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllCountries
}