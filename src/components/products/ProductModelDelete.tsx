import { Modal, Button } from "react-bootstrap";
import { ProductsURLWithID } from "../../Api";
import axios from "axios";

export default function ProductModelDelete(props: any) {
  const { show, handleClose, deleteId, getDataFromChild } = props;

  //Delete API
  const handleDelete = (id: number) => {
    axios
      .delete(ProductsURLWithID(id))
      .then(function (response) {
        getDataFromChild(response.status);
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
        handleClose();
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
