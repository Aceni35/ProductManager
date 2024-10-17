import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  changeCompany,
  changeProduct,
  sendOrder,
} from "../slices/OrdersSlice";
import MySpinner from "./MySpinner";
import { useSocketContext } from "../AppContext";

const AddOrderModal = ({ show, setShow }) => {
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(0);
  const handleClose = () => {
    setShow(false);
  };
  const { socket } = useSocketContext();
  const { products, companies, selectedCompany, selectedProduct, sendLoading } =
    useSelector((store) => store.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products != null && products.length != 0 && selectedProduct != "") {
      const ProductPrice = products.find((x) => x.id === selectedProduct).price;
      const numbers = String(amount * Number(ProductPrice)).split(".");
      if (numbers.length === 2) {
        setTotal(`${numbers[0]}.${numbers[1].slice(0, 2)}`);
      } else {
        setTotal(amount * Number(ProductPrice));
      }
    }
  }, [products, amount, selectedProduct]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {/* <div className="col-6">Select Company :</div>
            <div className="col-6 mb-2">
              <select
                value={selectedCompany}
                onChange={(e) => dispatch(changeCompany(e.target.value))}
              >
                {companies.map((x) => {
                  return (
                    <option value={x.accountID} key={x.accountID}>
                      {x.name}
                    </option>
                  );
                })}
              </select>
            </div> */}
            <div className="col-6 mb-2">Select Product</div>
            <div className="col-6">
              <select
                value={selectedProduct}
                onChange={(e) => {
                  dispatch(changeProduct(e.target.value));
                }}
              >
                {products.map((x) => {
                  return (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6">Amount</div>
            <div className="col-6">
              <input
                type="number"
                value={amount}
                style={{ width: "60px" }}
                min={1}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="col-12 mt-2"> Total : {total}$</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={sendLoading}
            variant="primary"
            onClick={() => {
              dispatch(addProduct({ id: selectedProduct, amount, total }));
              setShow(false);
              // const product = products.find((x) => x.id === selectedProduct);
              // dispatch(
              //   sendOrder({
              //     to: selectedCompany,
              //     amount,
              //     product,
              //     handleClose,
              //     socket,
              //   })
              // );
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddOrderModal;
