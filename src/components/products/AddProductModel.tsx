import { Button, Modal, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";
import { productsURL } from "../../Api";

function AddProductModel(props: any) {
  const { show, handleClose, category, getDataFromChild } = props;
  const [AddProducts, setAddProducts] = useState<any>({
    Categories: "",
    Description: "",
    Name: "",
    Price: "",
    SKU: "",
    Slug: "",
    Stock: "",
  });
  console.log(AddProducts);

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    setAddProducts({
      ...AddProducts,
      Slug: AddProducts.Name.toLowerCase().replace(/\s/g, "-"),
    });

    axios({
      method: "post",
      url: productsURL(),
      data: {
        data: {
          Categories: AddProducts.Categories,
          Description: AddProducts.Description,
          Name: AddProducts.Name,
          Price: AddProducts.Price,
          SKU: AddProducts.SKU,
          Slug: AddProducts.Slug,
          Stock: AddProducts.Stock,
        },
      },
    })
      .then((res) => {
        getDataFromChild(res.status);
        setAddProducts({
          Categories: "",
          Description: "",
          Name: "",
          Price: "",
          SKU: "",
          Slug: "",
          Stock: "",
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <>
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
        <form onSubmit={HandleSubmit}>
          <Modal.Body className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <TextField
              label="Product Name"
              type="text"
              className="rounded-0"
              onChange={(e) =>
                setAddProducts({ ...AddProducts, Name: e.target.value })
              }
              value={AddProducts.Name}
            />
            <TextField
              label="SKU"
              className="rounded-0"
              type="text"
              onChange={(e) =>
                setAddProducts({ ...AddProducts, SKU: e.target.value })
              }
              value={AddProducts.SKU}
            />
            <TextField
              label="Price"
              className="rounded-0"
              type="number"
              onChange={(e) =>
                setAddProducts({ ...AddProducts, Price: e.target.value })
              }
              value={AddProducts.Price}
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
                value={AddProducts.Categories}
                onChange={(e) =>
                  setAddProducts({ ...AddProducts, Categories: e.target.value })
                }
              >
                {category.map((data: any) => (
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
                value={typeof AddProducts.Stock !== "string" ? `${AddProducts.Stock === true ? "In Stock" : "Out Of Stock"}` : ''}
                onChange={(e) =>
                  setAddProducts({
                    ...AddProducts,
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
              value={AddProducts.Description}
              onChange={(e) =>
                setAddProducts({ ...AddProducts, Description: e.target.value })
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Add Products
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddProductModel;
