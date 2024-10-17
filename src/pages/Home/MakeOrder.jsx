import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCompany,
  clearOrder,
  removeProduct,
  sendOrder,
} from "../../slices/OrdersSlice";
import MySpinner from "../../components/MySpinner";
import { useSocketContext } from "../../AppContext";

const MakeOrder = ({ setMakeOrder, setAdd }) => {
  const {
    companies,
    selectedCompany,
    order,
    orderTotal,
    sendLoading,
    products,
  } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const [orderName, setOrderName] = useState("");
  useEffect(() => {
    dispatch(clearOrder());
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-sm">
        <div className="row bg-white rounded fs-5 py-2">
          <div className="col-8 my-auto">Make a new Order</div>
          <div className="col-4 d-flex justify-content-around">
            {" "}
            <button
              className="btn btn-warning"
              onClick={() => setMakeOrder(false)}
            >
              Go back
            </button>
          </div>
        </div>
        <div className="row bg-white my-1 rounded py-1">
          <div className="col-4 my-auto">
            Order name:{" "}
            <input
              type="text"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
            />
          </div>
          <div className="col-4 fs-6 my-auto ">
            Select Company
            <select
              value={selectedCompany}
              onChange={(e) => dispatch(changeCompany(e.target.value))}
              className="ms-3"
            >
              {companies.map((x) => {
                return (
                  <option value={x.accountID} key={x.accountID}>
                    {x.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4 text-center">
            <button className="btn btn-primary" onClick={() => setAdd(true)}>
              Add Product
            </button>
          </div>
        </div>
        <div className="row bg-white my-1">
          <div className="col-2">Product name</div>
          <div className="col-2">Amount</div>
          <div className="col-2">Price per unit</div>
          <div className="col-2 ">Weight</div>
          <div className="col-2 ">Total</div>

          {order.map((x, index) => {
            return <SingleProduct order={x} key={index} remove={true} />;
          })}
        </div>
        <div className="row mt-2 bg-white rounded py-1">
          <div className="col-10 fs-6 my-auto">Total: {orderTotal}$</div>
          <div className="col-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(
                  sendOrder({
                    to: selectedCompany,
                    total: orderTotal,
                    products: order,
                    socket,
                    orderName,
                    setMakeOrder,
                  })
                );
              }}
            >
              {sendLoading ? <MySpinner /> : "Send Order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const SingleProduct = ({ order, remove }) => {
  const dispatch = useDispatch();
  return (
    <div className="col-12 px-3">
      <div className="row bg-info rounded my-1 ">
        <div className="col-2">{order.name}</div>
        <div className="col-2">{order.amount}</div>
        <div className="col-2">{order.price}$</div>
        <div className="col-2">{order.weight}g</div>
        <div className="col-2">{order.total}$</div>
        {remove && (
          <div
            className="col-2 text-danger"
            onClick={() => dispatch(removeProduct({ id: order.id }))}
          >
            Remove
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeOrder;
