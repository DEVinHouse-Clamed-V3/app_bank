import { fireEvent, render } from "@testing-library/react-native"
import Header from "../src/screens/Home/Header"

describe("Teste do componente Header", () => {

    test("Deve está ocultado o saldo da conta", () => {
       const {getByText} =  render(<Header />)

       const textoPadraoDoSaldo = getByText("***")

       expect(textoPadraoDoSaldo).toBeTruthy()
    })

    test("Deve mostrar o saldo da conta quando clicar no texto mostrar", () => {
        const {getByTestId, getByText, queryByText} = render(<Header />)

        const buttonShowBalance = getByTestId("button-show-balance")
        fireEvent.press(buttonShowBalance)

        const saldoDaConta = getByText("R$ 1500")
        expect(saldoDaConta).toBeTruthy()
        
        const textoSaldoOcultado = queryByText("***")
        expect(textoSaldoOcultado).toBeFalsy()
    })

    test("Deve renderizar o nome do usuário e uma imagem", () => {
        const {getByText, getByTestId} = render(<Header />)

        const nomeDoUsuario = getByText('Henrique')
        expect(nomeDoUsuario).toBeTruthy()

        const fotoDoUsuario = getByTestId("photo-user")
        expect(fotoDoUsuario).toBeTruthy()

    })

})