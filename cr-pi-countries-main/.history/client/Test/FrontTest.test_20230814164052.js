/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
// import HomePage from "../src/components/HomePage.jsx"
import Container from '../src/components/Container.jsx';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import store from "../src/redux/store.js"

describe("Testing de componente FrontEnd (HomePage)", () => {

    test('Debe renderizar máximo 10 elementos a la vez', () => { 
        render(<Provider store={store}><Container/></Provider>);
    });

})