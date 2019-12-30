import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import GenericComponent from "./genericComponent";

describe(`Test Suite for Generic Component`, () => {
  it(`it should be able to render the greet message passsed`, () => {
    const { container } = render(<GenericComponent greet="admin" />);
    let elem = container.querySelector("h1");
    expect(elem.textContent).toMatch("admin");
  });

  it(`it should be able to render the greet message passsed`, () => {
    const { container } = render(<GenericComponent greet="viewer" />);
    let elem = container.querySelector("h1");
    expect(elem.textContent).toMatch("viewer");
  });

  it(`it should be able to render the greet message passsed`, () => {
    const { container } = render(<GenericComponent greet="publisher" />);
    let elem = container.querySelector("h1");
    expect(elem.textContent).toMatch("publisher");
  });
});
