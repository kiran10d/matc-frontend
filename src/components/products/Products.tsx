import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import ProductTable from "./ProductTable";

export default function Products() {
  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col className="mx-3">
            <div className="d-flex justify-content-end mt-5">
              <button className="btn btn-primary">
                {" "}
                <AiOutlinePlus /> New Product
              </button>
            </div>
            <div className="d-flex gap-3 mt-4">
              <StyledForm>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Select Category"
                  variant="light"
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Select Category"
                  variant="light"
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Status"
                  variant="light"
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
                <button className="btn btn-secondary">
                  <FiFilter /> FILTER
                </button>
                <div className="search">
                  <input type="text" placeholder="Search" />
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
            <ProductTable />
          </Col>
        </Row>
      </Container>
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
    flex: 2 1 auto;
    button {
      width: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
      font-size: 14px;
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
