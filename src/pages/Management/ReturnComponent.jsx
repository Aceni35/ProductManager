import React from "react";
import Products from "./Products";
import Operators from "./Operators";
import Account from "./Account";

const ReturnComponent = ({ selected }) => {
  if (selected === "Products") {
    return <Products />;
  } else if (selected === "Operators") {
    return <Operators />;
  } else {
    return <Account />;
  }
};

export default ReturnComponent;
