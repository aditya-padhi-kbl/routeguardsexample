import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Route, Router } from "react-router-dom";
import RouteGuard from "./routeGuardComponent";
import UnAuthorized from "./unAuthorizedComponent";
import { createBrowserHistory } from "history";
import { render } from "@testing-library/react";
/**
 * Sample App for Testing.
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
  it(`should be able to return the correct component when the user is authorized for that route`, () => {
    const history = createBrowserHistory();
    localStorage.setItem("role", "viewer");
    history.push("/dashboard");
    const { container } = render(
      <Router history={history}>
        <TestApp testText="Hello Viewer" />
      </Router>
    );

    expect(true).toBe(true);
    expect(history.location.pathname).toBe("/dashboard");
    expect(container.textContent).toMatch("Hello Viewer");
  });
});
