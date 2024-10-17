import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LogOutModal({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">Are you sure you want to Log Out?</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("ProductManager:Token");
              handleClose();
              window.location.reload();
            }}
            variant="danger"
          >
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogOutModal;
