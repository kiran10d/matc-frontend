import { Container, Row, Col, Button } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { categorysApi } from "../redux/CategorySlice";
import { useAppDispatch, useAppSelector } from "../hooks/Hooks";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { categorysURL } from "../Api";

export default function Categories() {
  const [category, setCategory] = useState([]);
  const [addCategory, setAddCategory] = useState({
    Name: "",
    Description: "",
  });
  const { categorys } = useAppSelector((state: any) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categorysApi());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, addCategory]);

  useEffect(() => {
    setCategory(categorys.data);
  }, [categorys]);

  const SLUG = addCategory.Name.toLowerCase().replace(/\s/g, "-");

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
    e.preventDefault();
    axios({
      method: "post",
      url: categorysURL(),
      data: {
        data: {
          Name: addCategory.Name,
          Description: addCategory.Description,
          Slug: SLUG,
        },
      },
    })
      .then((res) => {
        console.log(res, "res");
        setAddCategory({
          Name: "",
          Description: "",
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

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
                {category?.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Products Found
                    </td>
                  </tr>
                ) : (
                  <>
                    {category?.map((product: any) => (
                      <tr key={product.id}>
                        <td>{product.attributes.Name}</td>
                        <td>{product.attributes.Slug}</td>
                        <td>{product.attributes.createdAt}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </Col>
          <Col lg={4}>
            <StyledForm onSubmit={(e) => handleAddCategory(e)}>
              <h5>Add Category</h5>
              <TextField
                label="Name"
                type="text"
                className="rounded-0"
                onChange={(e) =>
                  setAddCategory({ ...addCategory, Name: e.target.value })
                }
                value={addCategory.Name}
                fullWidth
              />
              <TextField
                label="Slug"
                type="text"
                className="rounded-0"
                value={SLUG}
                fullWidth
                disabled={true}
              />
              <TextField
                label="Description"
                type="text"
                className="rounded-0"
                multiline
                rows={4}
                fullWidth
                onChange={(e) =>
                  setAddCategory({
                    ...addCategory,
                    Description: e.target.value,
                  })
                }
                value={addCategory.Description}
              />
              <Button variant="primary" type="submit">
                Add Category
              </Button>
            </StyledForm>
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
const StyledForm = styled.form`
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
