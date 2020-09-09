import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RedirectModal = (title, text, path) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Link to={path}>
            <Button variant="primary" onClick={handleClose}>
              {text}
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RedirectModal;
