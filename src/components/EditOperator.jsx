import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editOperator } from "../slices/ManagementSlice";
import MySpinner from "./MySpinner";

function EditOperator({ show, setShow, selected }) {
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const [details, setDetails] = useState({
    ...selected,
    originalPin: selected.pin,
    originalName: selected.name,
  });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const { updateOperatorLoading } = useSelector((store) => store.manage);
  useEffect(() => {
    setDetails({
      ...selected,
      originalPin: selected.pin,
      originalName: selected.name,
    });
  }, [selected]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Operator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">Name :</div>
            <div className="col-6">
              <input
                type="text"
                name="name"
                style={{ height: "25px" }}
                onChange={(e) => handleChange(e)}
                value={details.name}
              />
            </div>
            <div className="col-6">Access to Management</div>
            <div className="col-6 ">
              <input
                readOnly
                type="checkbox"
                name="management"
                checked={details.management}
                onClick={() =>
                  setDetails({ ...details, management: !details.management })
                }
              />
            </div>
            <div className="col-6">Access to Analytics</div>
            <div className="col-6 ">
              <input
                type="checkbox"
                name="analytics"
                readOnly
                checked={details.analytics}
                onClick={() =>
                  setDetails({ ...details, analytics: !details.analytics })
                }
              />
            </div>
            <div className="col-6 my-auto">Pin</div>
            <div className="col-6">
              <input
                type="text"
                style={{ height: "25px", width: "50%" }}
                name="pin"
                value={details.pin}
                maxLength={4}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-6 mt-1">Date joined</div>
            <div className="col-6 mt-1">{details.joined}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={updateOperatorLoading}
            onClick={() => {
              dispatch(editOperator({ details, setShow }));
            }}
          >
            {updateOperatorLoading ? <MySpinner /> : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditOperator;
