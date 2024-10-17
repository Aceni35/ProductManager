import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../slices/ManagementSlice";
import MySpinner from "../components/MySpinner";

function AddProductsModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const [details, setDetails] = useState({ name: "", price: 0, weight: 0 });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const { addProductLoading } = useSelector((store) => store.manage);
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
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6 my-2">Name:</div>
            <div className="col-6">
              <input
                type="text"
                name="name"
                value={details.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-6 my-2">Price ($):</div>
            <div className="col-6">
              <input
                type="number"
                name="price"
                value={details.price}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-6 my-2">Weight (g):</div>
            <div className="col-6">
              <input
                type="number"
                name="weight"
                value={details.weight}
                onChange={(e) => handleChange(e)}
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
            onClick={() => {
              dispatch(addProduct(details));
              setDetails({ name: "", price: 0, weight: 0 });
            }}
            disabled={addProductLoading}
          >
            {addProductLoading ? <MySpinner /> : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProductsModal;
