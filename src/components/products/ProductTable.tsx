import Table from "react-bootstrap/Table";
import { BsThreeDots } from "react-icons/bs";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import styled from "styled-components";


function ProductTable(props: any) {
  const { products } = props;

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: 12,
      border: "1px solid #dadde9",
      padding: 0,
    },
  }));

  
  return (
    <Table striped>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>SKU</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Categories</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center">
              No Products Found
            </td>
          </tr>
        )}
        {products?.map((product: any, index: number) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.attributes.Name}</td>
            <td>{product.attributes.SKU}</td>
            <td>{product.attributes.Stock ? "stock " : "out of stock"}</td>
            <td>{product.attributes.Price}</td>
            <td>{product.attributes.Categories}</td>
            <td>{product.attributes.publishedAt}</td>
            <td>
              <HtmlTooltip
                title={
                  <StyledToolTip>
                    <button onClick={() => console.log(index)}>
                      <FiEdit2 /> Edit
                    </button>
                    <button onClick={() => console.log(index)}>
                      <MdDeleteOutline /> Delete
                    </button>
                  </StyledToolTip>
                }
              >
                <Button>
                  <BsThreeDots />
                </Button>
              </HtmlTooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const StyledToolTip = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: #f5f5f9;
  border-radius: 0;
  button {
    background-color: #f5f5f9;
    border: none;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 0;
    padding: 10px 15px;
    &:hover {
      background-color: white;
    }
    svg{
      font-size: 18px;
    }
  }
`;

export default ProductTable;
