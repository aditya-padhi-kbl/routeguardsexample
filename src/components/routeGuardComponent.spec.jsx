import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Route } from "react-router-dom";
import RouteGuard from "./routeGuardComponent";
import UnAuthorized from "./unAuthorizedComponent";

/**
 * Sample App for Testing.
 * We can use index.js however this is a cleaner approach to test only this component
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
  it("should be able to ");
});
