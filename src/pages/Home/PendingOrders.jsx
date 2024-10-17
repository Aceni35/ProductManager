import React, { useState } from "react";
import Order from "./Order";

const PendingOrders = ({ name, showDetails, orders }) => {
  const [isOpen, setOpen] = useState(true);
  return (
    <div
      className="row mt-2 mb-2"
      style={{
        background: "#FFFFFF",
        transition: "max-height 0.7s",
        maxHeight: isOpen ? "1000px" : "40px",
        overflow: "hidden",
      }}
    >
      <div className="col-10 fs-3">
        {name} Orders ( {orders.length} ) :{" "}
      </div>
      <div
        className="col-2 text-center my-auto fs-5 text-success"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!isOpen)}
      >
        {" "}
        {!isOpen ? "Open" : "Close"}
      </div>
      <div className="col-sm-4 col-3 text1 ">Order name:</div>
      <div className="col-sm-4 col-3 text1">Order From / To:</div>
      <div className="col-2 text1">Order Status:</div>
      {orders.map((x) => {
        return (
          <div className="col-12 px-4 my-2" key={x._id}>
            <Order showDetails={showDetails} order={x} />
          </div>
        );
      })}
    </div>
  );
};

export default PendingOrders;
