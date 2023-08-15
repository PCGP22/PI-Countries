// import '@testing-library/jest-dom'
require("dotenv").config();

const request = require('supertest');
const server = require("../src/server.js");

describe('Prueba de rutas', () => {
    it('Ruta "Todos los Paises"', async() => {
        const response = await request(server).get("/countries/allCountries");
        expect(response.body).toHaveLength(250);
        expect(response.statusCode).toBe(200);
        // Testing a single element in the array
        expect(response.body).toEqual(expect.arrayContaining([{"id":"KEN","offName":"Republic of Kenya","name":"Kenya","image":"https://flagcdn.com/w320/ke.png","continent":"Africa","capitalCity":"Nairobi","subregion":"Eastern Africa","area":580367,"population":53771300},
    ]));

    });

});