import { fireEvent, render } from "@testing-library/react-native";
import Login from "../src/screens/Login";
import * as authActions from "../src/actions/auth.actions";

describe("Teste tela de login", () => {
    
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const {} = render(<Login />);

  it("Deve chamar a função de login", () => {
    
    const loginAction = jest.spyOn(authActions, "login").mockResolvedValue({
      data: { token: "123456-123456-123456-123456" },
    });

    const { getByTestId } = render(<Login />);

    const textInputCpf = getByTestId("input-cpf");
    fireEvent.changeText(textInputCpf, "99999999999");

    const textInputPassword = getByTestId("input-password");
    fireEvent.changeText(textInputPassword, "123456");

    const buttonLogin = getByTestId("button-login");
    fireEvent.press(buttonLogin);

    expect(loginAction).toHaveBeenCalledWith("999.999.999-99", "123456");
  });

  it("Deve não chamar a função de login quando os campos obrigatórios estão inválidos", () => {
    const loginAction = jest.spyOn(authActions, "login").mockResolvedValue({
      data: { token: "123456-123456-123456-123456" },
    });

    const { getByTestId } = render(<Login />);

    const textInputCpf = getByTestId("input-cpf");
    fireEvent.changeText(textInputCpf, "99999999999");

    const buttonLogin = getByTestId("button-login");
    fireEvent.press(buttonLogin);

    expect(loginAction).not.toHaveBeenCalled();
  });
});
