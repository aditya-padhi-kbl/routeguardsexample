import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import GenericComponent from "./components/genericComponent";
import UnAuthorized from "./components/unAuthorizedComponent";
import RouteGuard from "./components/routeGuardComponent";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul className="hide-bullets">
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>

        <Route
          path="/welcome"
          render={props => (
            <RouteGuard
              allowedRoles={["admin", "publisher", "viewer"]}
              render={guardProps => (
                <GenericComponent greet="user" {...guardProps} {...props} />
              )}
            />
          )}
        />

        <Route
          path="/home"
          render={props => (
            <RouteGuard
              allowedRoles={["admin", "publisher"]}
              render={guardProps => (
                <GenericComponent
                  greet="publisher"
                  {...guardProps}
                  {...props}
                />
              )}
            />
          )}
        />
        <Route
          path="/admin"
          render={props => (
            <RouteGuard
              allowedRoles={["admin"]}
              render={guardProps => (
                <GenericComponent greet="admin" {...guardProps} {...props} />
              )}
            />
          )}
        />
        <Route path="/unauthorized" component={UnAuthorized} />
      </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
