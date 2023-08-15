/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
// import HomePage from "../src/components/HomePage.jsx"
import Container from '../src/components/Container.jsx';
import { Provider } from "react-redux";
// import configureMockStore from "redux-mock-store";
import store from "../src/redux/store.js"
import db from "../../server/api/db.json"

describe("Testing de componente FrontEnd (HomePage)", () => {

    let source = db


    test('Debe renderizar máximo 10 elementos a la vez', () => { 
        render(<Provider store={store}><Container source={source}/></Provider>);
    });

})