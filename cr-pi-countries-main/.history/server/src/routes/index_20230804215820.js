const { Router } = require("express");
const { getAllActivities } = require("../controllers/getAllActivities.js")
const { getAllCountries } = require ("../controllers/getAllCountries.js")
const { getCountriesById } = require ("../controllers/getCountriesById.js")
const { getCountriesByName } = require ("../controllers/getCountriesByName.js")
const { postActivity } = require ("../controllers/postActivity.js")

const router = Router();

router.get("countries/", getAllCountries) 
router.get('/countries/countries/search', getCountriesByName)
router.get("/countries/countries/:idCountry", getCountriesById)
router.post("/countries/activities", postActivity)
router.get("/countries/activities", getAllActivities) 

module.exports = router;
