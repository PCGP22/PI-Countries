
import { screen, render} from '@testing-library/react';
// import HomePage from "../src/components/HomePage.jsx"
import Container from '../src/components/Container.jsx';

describe("Testing de componente FrontEnd (HomePage)", () => {
    
    test('Debe renderizar máximo 10 elementos a la vez', () => { 
        render(<Container/>);
    });

})