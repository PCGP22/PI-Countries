const { Router } = require("express");
const { getAllActivities } = require("../controllers/getAllActivities.js")
const { getAllCountries } = require ("../controllers/getAllCountries.js")
const { getCountriesById } = require ("../controllers/getCountriesById.js")
const { getCountriesByName } = require ("../controllers/getCountriesByName.js")
const { postActivity } = require ("../controllers/postActivity.js")
const { deleteActivities } = require ("../controllers/deleteActivity.js")

const router = Router();

router.get("/countries/allCountries", getAllCountries) 
router.get('/countries/countries/search', getCountriesByName)
router.get("/countries/countries/:idCountry", getCountriesById)
router.get("/countries/activities", getAllActivities) 
router.post("/countries/activities", postActivity)
router.delete("/countries/activities/:idActivity", deleteActivities)

module.exports = router;
