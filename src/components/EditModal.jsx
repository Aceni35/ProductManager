import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct } from "../slices/ManagementSlice";
import MySpinner from "./MySpinner";

function EditModal({ show, setShow, selected }) {
  const handleClose = () => setShow(false);
  const [details, setDetails] = useState(selected);
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setDetails(selected);
  }, [selected]);
  const { editLoading, deleteLoading } = useSelector((store) => store.manage);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6 my-2">Name:</div>
            <div className="col-6">
              <input
                type="text"
                value={details.name}
                onChange={(e) => handleChange(e)}
                name="name"
              />
            </div>
            <div className="col-6 my-2">Price ($):</div>
            <div className="col-6">
              <input
                type="number"
                value={details.price}
                onChange={(e) => handleChange(e)}
                name="price"
              />
            </div>
            <div className="col-6 my-2">Weight (g):</div>
            <div className="col-6">
              <input
                type="number"
                value={details.weight}
                onChange={(e) => handleChange(e)}
                name="weight"
              />
            </div>
          </div>
          <div className="col-12 mt-2 text-danger">
            Product ID : {details.id}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            disabled={deleteLoading || editLoading}
            onClick={() => {
              dispatch(deleteProduct({ id: details.id, setShow }));
            }}
          >
            {deleteLoading ? <MySpinner /> : "Delete"}
          </Button>
          <Button
            variant="primary"
            disabled={editLoading || deleteLoading}
            onClick={() => {
              dispatch(editProduct({ details, setShow }));
            }}
          >
            {editLoading ? <MySpinner /> : "Change"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
