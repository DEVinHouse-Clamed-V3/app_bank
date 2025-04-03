import { soma } from "../src/utils/soma";

describe("Teste da função soma", () => {

    test("Deve retornar 25 quando somar os valores 10 e 15", () => {
        const resultado = soma(10, 15)
        expect(resultado).toBe(25)
    })

})