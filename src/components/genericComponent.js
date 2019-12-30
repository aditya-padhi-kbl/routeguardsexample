import React from "react";

let GenericComponent = props => {
  /**
   * All the props from react-router is available here.
   */
  console.log(props);
  return <h1>Hello {props.greet}</h1>;
};

export default GenericComponent;
