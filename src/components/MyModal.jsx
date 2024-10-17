import Modal from "react-bootstrap/Modal";

function MyModal({ show, setShow, title, Body, Buttons, size }) {
  const handleClose = () => setShow(false);
  let size1 = "";
  if (size) {
    size1 = size;
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size={size1}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Body}</Modal.Body>
        <Modal.Footer>{Buttons}</Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
