import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "../slices/ManagementSlice";
import MySpinner from "./MySpinner";

function AddCompanyModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const { addCompanyLoading } = useSelector((store) => store.manage);

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
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 fs-5 mb-3 text-center">Enter Company ID</div>
            <div className="col-12 text-center">
              <input
                type="text"
                maxLength={5}
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
            disabled={addCompanyLoading}
            onClick={() => {
              dispatch(addCompany({ id: pin, setShow }));
            }}
          >
            {addCompanyLoading ? <MySpinner /> : "Add Company"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCompanyModal;
