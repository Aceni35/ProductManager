import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { changeOperator } from "../slices/OrdersSlice";
import MySpinner from "./MySpinner";

function OperatorModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const { changeOperatorLoading } = useSelector((store) => store.order);

  const [pin, setPin] = useState("");

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Operator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 fs-5 mb-3 text-center">
              Enter Operator Pin
            </div>
            <div className="col-12 text-center">
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => dispatch(changeOperator({ pin }))}
          >
            {changeOperatorLoading ? <MySpinner /> : "Change"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OperatorModal;
