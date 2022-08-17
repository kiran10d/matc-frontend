import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { BiExit } from "react-icons/bi";

export default function Customers() {
  const location = useLocation();
  const path = location.pathname.replace("/", "");
  console.log(location.pathname, path);

  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col className="m-4 d-flex justify-content-between">
            <Styledh5>{path === "" ? "Dashboard" : path}</Styledh5>
            <StyledViewSite>
              <p>View your store</p>
              <BiExit />
            </StyledViewSite>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const Styledh5 = styled.h5`
  text-transform: capitalize;
`;

const StyledViewSite = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  p {
    font-weight: 500;
  }
  svg {
    font-size: 23px;
    cursor: pointer;
  }
`;
