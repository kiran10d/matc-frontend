import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import ProductTable from "./ProductTable";
import { productsURL } from "../../Api";
import axios from "axios";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddProductModel from "./AddProductModel";

export default function Products() {
  const [products, setProducts] = useState<any>();
  const [update, setUpdate] = useState<any>();
  const [productsData, setProductsData] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState<any>({
    category: "",
    stock: "",
    price: "",
    search: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

    axios
      .get(productsURL())
      .then(function (response) {
        setProducts(response.data);
        setProductsData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [update]);

  //Callback function to get the data from child component
  const getDataFromChild = (index: any) => {
    setUpdate(index);
  };

  //Category Array
  const category = [
    ...new Set(products?.data.map((data: any) => data.attributes.Categories)),
  ];

  //Category filter
  const handleCategoryFilter = (event: SelectChangeEvent) => {
    let data = event.target.value;
    setFilter({ ...filter, category: data });
    const filterCategory = products?.data.filter(
      (d: { attributes: { Categories: string } }) =>
        d.attributes.Categories === data
    );
    setProductsData(filterCategory);
  };

  //Stock Filter
  const handleStockFilter = (event: SelectChangeEvent) => {
    let data = event.target.value === "In Stock" ? true : false;
    setFilter({ ...filter, stock: event.target.value });
    const filterStock = products?.data.filter(
      (d: { attributes: { Stock: boolean } }) => d.attributes.Stock === data
    );
    setProductsData(filterStock);
  };

  //Price Filter
  const handlePriceFilter = (event: SelectChangeEvent) => {
    let data = event.target.value;
    setFilter({ ...filter, price: data });
    if (data === "low") {
      const lowToHigh = [...products.data].sort(
        (a, b) => a.attributes.Price - b.attributes.Price
      );
      setProductsData(lowToHigh);
    } else if (data === "high") {
      const HighToLow = [...products.data].sort(
        (a, b) => b.attributes.Price - a.attributes.Price
      );
      setProductsData(HighToLow);
    }
  };

  //Clear Filter
  const handleClearFilter = () => {
    setProductsData(products.data);
    setFilter({
      category: "",
      stock: "",
      price: "",
      search: "",
    });
  };

  //Search Filter
  const handleSearchFilter = (event: any) => {
    let data = event.target.value;
    setFilter({ ...filter, search: data });
    const filterSearch = products?.data.filter(
      (d: { attributes: { Name: string } }) =>
        d.attributes.Name.toLowerCase().includes(data.toLowerCase())
    );
    setProductsData(filterSearch);
  };


  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col className="mx-3">
            <div className="d-flex justify-content-end mt-5">
              <button className="btn btn-primary" onClick={handleShow}>
                {" "}
                <AiOutlinePlus /> New Product
              </button>
            </div>
            <div className="d-flex gap-3 mt-4">
              <StyledForm>
                <FormControl
                  sx={{ m: 1, minWidth: 200 }}
                  size="small"
                  className="dropdown"
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="category"
                    value={filter.category}
                    onChange={handleCategoryFilter}
                    className="dropdown-select"
                  >
                    {category.map((data: any) => (
                      <MenuItem value={data}>{data}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ m: 1, minWidth: 200 }}
                  size="small"
                  className="dropdown"
                >
                  <InputLabel>Stock</InputLabel>
                  <Select
                    label="Stock"
                    value={filter.stock}
                    onChange={handleStockFilter}
                    className="dropdown-select"
                  >
                    <MenuItem value="In Stock">In Stock</MenuItem>
                    <MenuItem value="Out Of Stock">Out Of Stock</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ m: 1, minWidth: 200 }}
                  size="small"
                  className="dropdown"
                >
                  <InputLabel>Price</InputLabel>
                  <Select
                    label="Price"
                    value={filter.price}
                    onChange={handlePriceFilter}
                    className="dropdown-select"
                  >
                    <MenuItem value="low">Low to High</MenuItem>
                    <MenuItem value="high">High to Low</MenuItem>
                  </Select>
                </FormControl>
                <button
                  className="btn btn-secondary"
                  onClick={handleClearFilter}
                >
                  <FiFilter /> CLEAR
                </button>
                <div className="search">
                  <input
                    type="text"
                    placeholder="Search"
                    value={filter.search}
                    onChange={handleSearchFilter}
                  />
                  <BiSearchAlt />
                </div>
              </StyledForm>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="mx-3 mt-5">
            <ProductTable products={productsData} setUpdate={setUpdate} getDataFromChild={getDataFromChild} category={category}/>
          </Col>
        </Row>
      </Container>
      <AddProductModel
        show={show}
        handleClose={handleClose}
        category={category}
        getDataFromChild={getDataFromChild}
      />
    </div>
  );
}

const StyledForm = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  .dropdown {
    margin: 0;
    .dropdown-select {
      border-radius: 0;
    }
  }
  .search {
    position: relative;
    flex: 2 1 auto;
    input {
      font-size: 14px;
      padding: 0 20px;
      border-radius: 0;
      border: 1px solid #ddd;
      transition: all 0.4s ease;
      box-shadow: 0 0 0 transparent;
      background-color: transparent;
      height: -webkit-fill-available;
      width: -webkit-fill-available;
    }
    svg {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  }
`;
