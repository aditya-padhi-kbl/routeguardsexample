import React from "react";
import { render } from "@testing-library/react";
import UnAuthorized from "./unAuthorizedComponent";
import "@testing-library/jest-dom/extend-expect";

describe(`Test Suit for UnAuthorizedComponent`, () => {
  it(`Should render You are not authorized when rendered`, () => {
    const { getByTestId } = render(<UnAuthorized />);
    expect(getByTestId("unAuthorizedComponentText")).toHaveTextContent(
      "You are not authorized"
    );
  });
});
