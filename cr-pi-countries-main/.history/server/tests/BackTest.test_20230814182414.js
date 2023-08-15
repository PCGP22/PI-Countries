// import '@testing-library/jest-dom'
require("dotenv").config();

const request = require('supertest');
const server = require("../src/server.js");

describe('Prueba de rutas', () => {
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
        expect(response.body).toEqual(expect.arrayContaining([{"id":"KEN","offName":"Republic of Kenya","name":"Kenya","image":"https://flagcdn.com/w320/ke.png","continent":"Africa","capitalCity":"Nairobi","subregion":"Eastern Africa","area":580367,"population":53771300},]));
    })

});