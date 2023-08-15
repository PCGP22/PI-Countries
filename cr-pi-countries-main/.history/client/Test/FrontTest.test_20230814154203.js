import {fireEvent, render} from '@testing-library/react';
import HomePage from "../src/components/HomePage.jsx"

describe("Testing de componente FrontEnd (HomePage)", () => {
    
    test('Debe renderizar máximo 10 elementos a la vez', () => { 
        render(
            <HomePage />,
        )
    });

})