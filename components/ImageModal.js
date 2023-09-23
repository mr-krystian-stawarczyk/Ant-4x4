import React from "react";
import { Modal } from "react-bootstrap";

const ImageModal = ({ show, handleClose, imageUrl }) => {
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Body className="centered-modal">
				<img src={imageUrl} className="modal-content" alt="Modal" />
			</Modal.Body>
		</Modal>
	);
};

export default ImageModal;
