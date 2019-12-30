import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Route, Router } from "react-router-dom";
import RouteGuard from "./routeGuardComponent";
import UnAuthorized from "./unAuthorizedComponent";
import { createBrowserHistory } from "history";
import { render, cleanup } from "@testing-library/react";
/**
 * Sample App for Testing.
 * We can use this approach to test a component that returns redirect url.  We will be using awesome history
 * module to keep track of history changes.
 * We can use index.js code, however this is a cleaner approach to test only this component
 */
function TestApp({ testText }) {
  return (
    <>
      <Route
        path="/dashboard"
        render={props => (
          <RouteGuard
            allowedRoles={["admin", "viewer", "publisher"]}
            render={_ => <h2>{testText}</h2>}
          />
        )}
      />
      <Route
        path="/admin"
        render={props => (
          <RouteGuard
            allowedRoles={["admin", "publisher"]}
            render={_ => <h2>{testText}</h2>}
          />
        )}
      />
      <Route path="/unauthorized" component={UnAuthorized} />
    </>
  );
}
describe(`Test Suite for RouteGuard`, () => {
  afterEach(cleanup);
  it(`should be able to return the correct component when the user is authorized for that route`, () => {
    const history = createBrowserHistory();
    localStorage.setItem("userRole", "viewer");
    history.push("/dashboard");
    let sampleTextContent = "Hello Viewer";
    const { container } = render(
      <Router history={history}>
        <TestApp testText={sampleTextContent} />
      </Router>
    );
    expect(history.location.pathname).toBe("/dashboard");
    expect(container.textContent).toMatch(sampleTextContent);
  });

  it(`It should automatically redirect to /unauthorized when an unauthorized user tries to access a protected page`, () => {
    const history = createBrowserHistory();
    localStorage.setItem("userRole", "viewer");
    history.push("/admin");
    let sampleTextContent = "Hello Viewer";
    const { container } = render(
      <Router history={history}>
        <TestApp testText={sampleTextContent} />
      </Router>
    );
    const UNAUTHORIZED_MESSAGE = "You are not authorized";
    expect(history.location.pathname).toBe("/unauthorized");
    expect(container.textContent).toMatch(UNAUTHORIZED_MESSAGE);
  });

  it(` /admin should only be accessible to admin & publisher roles & will redirect to /unauthorized when the role changes`, () => {
    const history = createBrowserHistory();
    localStorage.setItem("userRole", "admin");
    history.push("/admin");
    let sampleTextContent = "Hello Admin";
    const { container } = render(
      <Router history={history}>
        <TestApp testText={sampleTextContent} />
      </Router>
    );

    expect(history.location.pathname).toBe("/admin");
    expect(container.textContent).toMatch(sampleTextContent);
    localStorage.setItem("userRole", "viewer");
    history.push("/admin");
    const UNAUTHORIZED_MESSAGE = "You are not authorized";
    expect(history.location.pathname).toBe("/unauthorized");
    expect(container.textContent).toMatch(UNAUTHORIZED_MESSAGE);
  });
});
