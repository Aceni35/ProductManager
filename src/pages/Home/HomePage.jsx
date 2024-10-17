import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PendingOrders from "./PendingOrders";
import OperatorModal from "../../components/OperatorModal";
import MyModal from "../../components/MyModal";
import { Button } from "react-bootstrap";
import AddOrderModal from "../../components/AddOrderModal";
import { useDispatch, useSelector } from "react-redux";
import { answerOrder, getOrderPage } from "../../slices/OrdersSlice";
import MySpinner from "../../components/MySpinner";
import { returnSender } from "./Order";
import { useSocketContext } from "../../AppContext";
import MakeOrder, { SingleProduct } from "./MakeOrder";
const HomePage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showOperator, setShowOperator] = useState(false);
  const [makeOrder, setMakeOrder] = useState(false);
  const [addModal, setAdd] = useState(false);
  const dispatch = useDispatch();
  const { orderPageLoading, operator, uncompletedOrders, completedOrders } =
    useSelector((store) => store.order);

  useEffect(() => {
    dispatch(getOrderPage());
  }, []);

  if (orderPageLoading) {
    return (
      <>
        <Navbar />

        <div className="row">
          <div className="col-12 text-center">
            <MySpinner />
          </div>
        </div>
      </>
    );
  }
  if (makeOrder) {
    return (
      <>
        <MakeOrder setMakeOrder={setMakeOrder} setAdd={setAdd} />;
        <AddOrderModal show={addModal} setShow={setAdd} />
      </>
    );
  }
  return (
    <>
      <MyModal
        show={showDetails}
        size={"xl"}
        setShow={setShowDetails}
        Body={<ModalBody />}
        title={"Order Details"}
        Buttons={<Buttons setShow={setShowDetails} />}
      />
      <OperatorModal show={showOperator} setShow={setShowOperator} />
      <Navbar />
      <div className="container-sm ">
        <div className="row rounded" style={{ background: "#FFFFFF" }}>
          <div className="col-sm-8 col-6 py-2 fs-4 text1 text-break">
            Operator: <span className="text-danger text1">{operator.name}</span>{" "}
          </div>
          <div className="col-sm-2 col-3 py-2 fs-4">
            <button
              className="btn btn-info text1 text-break"
              onClick={() => setMakeOrder(true)}
            >
              Add order
            </button>
          </div>
          <div
            className="col-sm-2 col-3 text1 text-break my-auto text-primary text-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowOperator(true);
            }}
          >
            Change Operator
          </div>
        </div>
        <PendingOrders
          name={"Pending"}
          showDetails={setShowDetails}
          orders={uncompletedOrders}
        />
        <PendingOrders
          name={"Completed"}
          showDetails={setShowDetails}
          orders={completedOrders}
        />
      </div>
    </>
  );
};

export const ModalBody = () => {
  const { selectedOrder, info } = useSelector((store) => store.order);
  const { amount, date, operator, product, total, name } = selectedOrder;

  const sender = returnSender(selectedOrder, info);
  return (
    <>
      <div className="row fs-6">
        <div className="col-4 text-center">Order from/to : {sender}</div>
        <div className="col-4 text-center">Time : {date.slice(11, 19)}</div>
        <div className="col-4 text-center">Date : {date.slice(0, 10)}</div>
      </div>
      <hr className="mt-2 mb-0" />
      <div className="row mt-1">
        <div className="col-2">Product name :</div>
        <div className="col-2">Amount :</div>
        <div className="col-2">Price per unit :</div>
        <div className="col-2 ">Weight :</div>
        <div className="col-2 ">Total :</div>
        {selectedOrder.products.map((x, index) => {
          return <SingleProduct order={x} key={index} />;
        })}
      </div>
      <hr className="mt-1" />
      <div className="row">
        <div className="col-4 text-center fs-6">Total {total} $</div>
        <div className="col-4 text-center fs-6">Operator : {operator}</div>
        <div className="col-4 text-center fs-6">Order Name : {name}</div>
      </div>
    </>
  );
};

export const Buttons = ({ setShow }) => {
  const { info, selectedOrder, answerLoading } = useSelector(
    (store) => store.order
  );
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const isMe = info.accountID === selectedOrder.from.accountID ? true : false;

  return (
    <>
      <Button variant="secondary" onClick={() => setShow(false)}>
        Close
      </Button>
      {isMe && selectedOrder.status === "pending" && (
        <Button
          variant="danger"
          onClick={() =>
            dispatch(
              answerOrder({
                orderID: selectedOrder._id,
                answer: "cancel",
                to: selectedOrder.to.accountID,
                setShow,
                socket,
              })
            )
          }
        >
          Cancel Order
        </Button>
      )}
      {!isMe && selectedOrder.status === "pending" && (
        <>
          <Button
            disabled={answerLoading}
            variant="danger"
            onClick={() =>
              dispatch(
                answerOrder({
                  orderID: selectedOrder._id,
                  answer: "reject",
                  setShow,
                  to: selectedOrder.from.accountID,
                  socket,
                })
              )
            }
          >
            Reject Order
          </Button>
          <Button
            disabled={answerLoading}
            variant="success"
            onClick={() =>
              dispatch(
                answerOrder({
                  orderID: selectedOrder._id,
                  answer: "accept",
                  setShow,
                  to: selectedOrder.from.accountID,
                  socket,
                })
              )
            }
          >
            Acept Order
          </Button>
          {answerLoading && <MySpinner />}
        </>
      )}
    </>
  );
};

export default HomePage;
