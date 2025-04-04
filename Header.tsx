import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Header from "./src/screens/Home/Header";


describe("Header Component", () => {

 
  it("should render the user's first name", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Henrique")).toBeTruthy();
  });

  it("should initially hide the balance", () => {
    const { getByText } = render(<Header />);
    expect(getByText("***")).toBeTruthy();
  });

  it("should toggle the balance visibility when the eye icon is pressed", () => {
    const { getByText, getByTestId, queryByTestId } = render(<Header />);
  
    // Inicialmente, o saldo está oculto
    expect(getByText("***")).toBeTruthy();
    expect(getByTestId("eye-off-icon")).toBeTruthy();
  
    // Pressione o ícone "eye-off" para mostrar o saldo
    fireEvent.press(getByTestId("eye-off-icon"));
    expect(getByText("R$ 1500")).toBeTruthy();
    expect(queryByTestId("eye-off-icon")).toBeNull(); // O ícone "eye-off" deve desaparecer
    expect(getByTestId("eye-icon")).toBeTruthy(); // O ícone "eye" deve aparecer
  
    // Pressione o ícone "eye" para ocultar o saldo novamente
    fireEvent.press(getByTestId("eye-icon"));
    expect(getByText("***")).toBeTruthy();
    expect(queryByTestId("eye-icon")).toBeNull(); // O ícone "eye" deve desaparecer
    expect(getByTestId("eye-off-icon")).toBeTruthy(); // O ícone "eye-off" deve aparecer
  });

  it("should render the user's profile image", () => {
    const { getByTestId } = render(<Header />);
    const profileImage = getByTestId("profile-image");
    expect(profileImage.props.source.uri).toBe(
      "https://lh3.googleusercontent.com/a/ACg8ocKcl_rB94Py1qw03nYRxBD4mHOuyMZawCHt_vclTr8jqQC82Sk=s192-c-mo"
    );
  });
});