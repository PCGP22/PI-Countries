import renderer from "react-test-renderer"
import HomePage from "../src/components/HomePage.jsx"

describe("Testing de componente FrontEnd (HomePage)", () => {
    
    test('Debe renderizar máximo 10 elementos a la vez', () => { 
        const component = renderer.create(
            <HomePage/>
        )
        console.log(component)
        // expect(component).toBe(10)
    });

})