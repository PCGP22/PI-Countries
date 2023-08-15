/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
// import HomePage from "../src/components/HomePage.jsx"
import Container from '../src/components/Container.jsx';
import { Provider } from "react-redux";
// import configureMockStore from "redux-mock-store";
import store from "../src/redux/store.js"

describe("Testing de componente FrontEnd (HomePage)", () => {

    let source = [{"id":"KEN","offName":"Republic of Kenya","name":"Kenya","image":"https://flagcdn.com/w320/ke.png","continent":"Africa","capitalCity":"Nairobi","subregion":"Eastern Africa","area":580367,"population":53771300},
    {"id":"SMR","offName":"Republic of San Marino","name":"San Marino","image":"https://flagcdn.com/w320/sm.png","continent":"Europe","capitalCity":"City of San Marino","subregion":"Southern Europe","area":61,"population":33938},
    {"id":"PYF","offName":"French Polynesia","name":"French Polynesia","image":"https://flagcdn.com/w320/pf.png","continent":"Oceania","capitalCity":"Papeetē","subregion":"Polynesia","area":4167,"population":280904},
    {"id":"SLE","offName":"Republic of Sierra Leone","name":"Sierra Leone","image":"https://flagcdn.com/w320/sl.png","continent":"Africa","capitalCity":"Freetown","subregion":"Western Africa","area":71740,"population":7976985},
    {"id":"MDG","offName":"Republic of Madagascar","name":"Madagascar","image":"https://flagcdn.com/w320/mg.png","continent":"Africa","capitalCity":"Antananarivo","subregion":"Eastern Africa","area":587041,"population":27691019},
    {"id":"NGA","offName":"Federal Republic of Nigeria","name":"Nigeria","image":"https://flagcdn.com/w320/ng.png","continent":"Africa","capitalCity":"Abuja","subregion":"Western Africa","area":923768,"population":206139587},
    {"id":"JOR","offName":"Hashemite Kingdom of Jordan","name":"Jordan","image":"https://flagcdn.com/w320/jo.png","continent":"Asia","capitalCity":"Amman","subregion":"Western Asia","area":89342,"population":10203140},
    {"id":"LBY","offName":"State of Libya","name":"Libya","image":"https://flagcdn.com/w320/ly.png","continent":"Africa","capitalCity":"Tripoli","subregion":"Northern Africa","area":1759540,"population":6871287},
    {"id":"GUY","offName":"Co-operative Republic of Guyana","name":"Guyana","image":"https://flagcdn.com/w320/gy.png","continent":"South America","capitalCity":"Georgetown","subregion":"South America","area":214969,"population":786559},
    {"id":"MEX","offName":"United Mexican States","name":"Mexico","image":"https://flagcdn.com/w320/mx.png","continent":"North America","capitalCity":"Mexico City","subregion":"North America","area":1964375,"population":128932753},]

    test('Debe renderizar máximo 10 elementos a la vez', () => { 
        render(<Provider store={store}><Container source={source}/></Provider>);
    });

})