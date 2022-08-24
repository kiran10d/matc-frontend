import { Container, Row, Col, Button } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { productsApi } from "../redux/ProductsSlice";
import { useAppDispatch, useAppSelector } from "../Hooks";
import TextField from "@mui/material/TextField";

export default function Categories() {
  const [productsCategory, setProductsCategory] = useState([]);
  const [addCategory, setAddCategory] = useState("");
  const { products, loading } = useAppSelector((state: any) => state.products);
  const dispatch = useAppDispatch();

  console.log(productsCategory, "loading", loading);

  useEffect(() => {
    dispatch(productsApi());
    setProductsCategory(products.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  //Search Filter
  const handleSearchFilter = (event: any) => {
    let data = event.target.value;
    const filterSearch = products?.data.filter(
      (d: { attributes: { Categories: string } }) =>
        d.attributes.Categories.toLowerCase().includes(data.toLowerCase())
    );
    setProductsCategory(filterSearch);
  };


  const handleAddCategory = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className="main-container">
      <Container>
        <Row className="mt-5">
          <Col lg={8}>
            <StyledSearch className="ms-3">
              <input
                type="text"
                placeholder="Search"
                // value={filter.search}
                onChange={(e) => handleSearchFilter(e)}
              />
              <BiSearchAlt />
            </StyledSearch>
            <Table striped className="mx-3 mt-3">
              <thead>
                <tr>
                  <th>Category name</th>
                  <th>Slug</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                {productsCategory?.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Products Found
                    </td>
                  </tr>
                )}
                {productsCategory?.map((product: any) => (
                  <tr key={product.id}>
                    <td>{product.attributes.Categories}</td>
                    <td>{product.attributes.Name}</td>
                    <td>{product.attributes.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col lg={4}>
            <form>
              <TextField
                label="Add Category"
                type="text"
                className="rounded-0"
                onChange={(e) => setAddCategory(e.target.value)}
                value={addCategory}
              />
              <Button variant="primary" type="submit" onClick={(e) => handleAddCategory(e)}>
                Add Category
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const StyledSearch = styled.div`
  position: relative;
  max-width: 300px;
  input {
    font-size: 14px;
    padding: 10px 20px;
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
`;
