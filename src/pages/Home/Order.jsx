import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSelected } from "../../slices/OrdersSlice";

const Order = ({ showDetails, order }) => {
  const { companies, info } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const returnState = (order) => {
    if (info.accountID === order.from.accountID && order.status === "pending") {
      return "Sent";
    } else if (
      info.accountID != order.from.accountID &&
      order.status === "pending"
    ) {
      return "Received";
    } else if (order.status === "accepted") {
      return "Complete";
    } else if (order.status === "rejected") {
      return "Rejected";
    }
  };

  return (
    <>
      <div
        className="row fs-4 rounded p-1"
        style={{ color: "white", background: "#EB5E28" }}
      >
        <div className="col-sm-4 col-3 my-auto">{order.name}</div>
        <div className="col-sm-4 col-3 my-auto">
          {returnSender(order, info)}
        </div>
        <div className="col-2 my-auto">{returnState(order)}</div>
        <div className="col-sm-2 col-4 my-auto">
          <button
            className="btn btn-light"
            onClick={() => {
              dispatch(changeSelected(order));
              showDetails(true);
            }}
          >
            View order
          </button>
        </div>
      </div>
    </>
  );
};

export const returnSender = (order, info) => {
  if (order.from.accountID === info.accountID) {
    return order.to.name;
  } else {
    return order.from.name;
  }
};

export default Order;
