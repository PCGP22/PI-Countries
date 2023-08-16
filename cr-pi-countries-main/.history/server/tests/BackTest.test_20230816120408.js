// import '@testing-library/jest-dom'
require("dotenv").config();

const request = require('supertest');
const server = require("../src/server.js");
const {conn} = require("../src/db.js")


describe('Prueba de rutas', () => {

    beforeAll(()=>{
        conn.sync({ force: true })
            .then(() =>server.listen(5000).close())
            // .finally(()=> server.close)
    })

    test('Ruta "Todos los Paises"', async() => {
        const response = await request(server).get("/countries/allCountries");
        expect(response.body).toHaveLength(250);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([{"id":"KEN","offName":"Republic of Kenya","name":"Kenya","image":"https://flagcdn.com/w320/ke.png","continent":"Africa","capitalCity":"Nairobi","subregion":"Eastern Africa","area":580367,"population":53771300},]));
    });

    test('Ruta "Buscar país por Id"', async() => {
        const response = await request(server).get("/countries/countries/KEN");
        expect(response.body).toHaveLength(1);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([ {"Activities": [], "area": 580367, "capitalCity": "Nairobi", "continent": "Africa", "id": "KEN", "image": "https://flagcdn.com/w320/ke.png", "name": "Kenya", "offName": "Republic of Kenya", "population": 53771300, "subregion": "Eastern Africa"},]));
    })

    test('Ruta "Crear Actividad"', async() => {
        const placeHolderActivity = {name: "Actividad 1", difficulty: 3, duration: 2, season: "Otoño", countryId: ["SMR"] }
        const response = await request(server).post("/countries/activities/").send(placeHolderActivity);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
    })

});