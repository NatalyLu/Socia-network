import React from "react";
import { useParams } from "react-router-dom";


export const withUrlParams= (Component) => {
  const ComponentWithParams = (props) => {
    return (<Component {...props} params={useParams()} />);
  }

  return ComponentWithParams;
};
