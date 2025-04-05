import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Intro from "../src/screens/Intro";

describe("Intro Screen", () => {
  const mockNavigate = jest.fn();

  const navigation = {
    navigate: mockNavigate,
  };

  it("should render the bank name", () => {
    const { getByText } = render(<Intro navigation={navigation} />);
    expect(getByText("Your Bank")).toBeTruthy();
  });

  it("should render the logo image", () => {
    const { getByTestId } = render(<Intro navigation={navigation} />);
    const logoImage = getByTestId("bank-logo");
    expect(logoImage.props.source).toEqual(
      require("../assets/Logo.png")
    );
  });

  it("should render the title", () => {
    const { getByText } = render(<Intro navigation={navigation} />);
    expect(getByText("Um mundo financeiro sem complexidades!")).toBeTruthy();
  });

  it("should navigate to the Login screen when the button is pressed", () => {
    const { getByText } = render(<Intro navigation={navigation} />);

    const button = getByText("Começar");

    fireEvent.press(button);
    
    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});