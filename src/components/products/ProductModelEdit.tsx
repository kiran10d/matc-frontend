import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { deleteProductsURL } from "../../Api";

export default function ProductModelEdit(props: any) {
  const { show, handleClose, editId, category, products } =
    props;
  const [editProducts, setEditProducts] = useState<any>({});

  useEffect(() => {
    const filterProduct = products?.filter(
      (d: { id: number }) => d.id === editId
    );
    setEditProducts(filterProduct[0]?.attributes);
    console.log(editProducts, editId, "filterProduct");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  //Edit API
  const HandleSubmit = (editId: number) => {
    axios({
      method: "put",
      url: deleteProductsURL(editId),
      data: {
        data: {
          Categories: editProducts.Categories,
          Description: editProducts.Description,
          Name: editProducts.Name,
          Price: editProducts.Price,
          SKU: editProducts.SKU,
          Slug: editProducts.Slug,
          Stock: editProducts.Stock,
        },
      },
    });
  };

  console.log(editProducts, "editProducts");

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={() => HandleSubmit(editId)}>
          <Modal.Body className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <TextField
              label="Product Name"
              type="text"
              className="rounded-0"
              onChange={(e) =>
                setEditProducts({ ...editProducts, Name: e.target.value })
              }
              value={editProducts?.Name}
            />
            <TextField
              label="SKU"
              className="rounded-0"
              type="text"
              onChange={(e) =>
                setEditProducts({ ...editProducts, SKU: e.target.value })
              }
              value={editProducts?.SKU}
            />
            <TextField
              label="Price"
              className="rounded-0"
              type="number"
              onChange={(e) =>
                setEditProducts({ ...editProducts, Price: e.target.value })
              }
              value={editProducts?.Price}
            />
            <FormControl
              sx={{ minWidth: 236 }}
              size="small"
              className="dropdown"
            >
              <InputLabel>Category</InputLabel>
              <Select
                label="category"
                className="rounded-0"
                value={editProducts?.Categories}
                onChange={(e) =>
                  setEditProducts({
                    ...editProducts,
                    Categories: e.target.value,
                  })
                }
              >
                {category?.map((data: any) => (
                  <MenuItem value={data}>{data}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{ minWidth: 236 }}
              size="small"
              className="dropdown"
            >
              <InputLabel>Stock</InputLabel>
              <Select
                className="rounded-0"
                label="Stock"
                value={
                  typeof editProducts?.Stock !== "string"
                    ? `${
                        editProducts?.Stock === true
                          ? "In Stock"
                          : "Out Of Stock"
                      }`
                    : ""
                }
                onChange={(e) =>
                  setEditProducts({
                    ...editProducts,
                    Stock: e.target.value === "In Stock" ? true : false,
                  })
                }
              >
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Out Of Stock">Out Of Stock</MenuItem>
              </Select>
            </FormControl>
            <Form.Group
              controlId="formFile"
              style={{ minWidth: 236, width: 236 }}
            >
              <Form.Control type="file" className="rounded-0" />
            </Form.Group>
            <TextField
              label="Description"
              className="rounded-0"
              multiline
              rows={4}
              fullWidth
              sx={{ m: 1 }}
              value={editProducts?.Description}
              onChange={(e) =>
                setEditProducts({
                  ...editProducts,
                  Description: e.target.value,
                })
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              Edit Products
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
