import { Container, Row, Col, Button } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { categorysApi } from "../redux/CategorySlice";
import { useAppDispatch, useAppSelector } from "../Hooks";
import TextField from "@mui/material/TextField";

export default function Categories() {
  const [category, setCategory] = useState([]);
  const [addCategory, setAddCategory] = useState("");
  const { categorys, loading } = useAppSelector((state: any) => state.category);
  const dispatch = useAppDispatch();

  console.log(category, "loading", loading);

  useEffect(() => {
    dispatch(categorysApi());
    setCategory(categorys.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  //Search Filter
  const handleSearchFilter = (event: any) => {
    let data = event.target.value;
    const filterSearch = categorys?.data.filter(
      (d: { attributes: { Categories: string } }) =>
        d.attributes.Categories.toLowerCase().includes(data.toLowerCase())
    );
    setCategory(filterSearch);
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
                {category?.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Products Found
                    </td>
                  </tr>
                )}
                {category?.map((product: any) => (
                  <tr key={product.id}>
                    <td>{product.attributes.Name}</td>
                    <td>{product.attributes.Slug}</td>
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
