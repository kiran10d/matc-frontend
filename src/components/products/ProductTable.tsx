import Table from "react-bootstrap/Table";
import { BsThreeDots } from "react-icons/bs";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import styled from "styled-components";

import { SetStateAction, useState } from "react";
import ProductModelDelete from "./ProductModelDelete";
import ProductModelEdit from "./ProductModelEdit";

function ProductTable(props: any) {
  const [show, setShow] = useState<boolean>(false);
  const [showEditModel, setShowEditModel] = useState<boolean>(false);

  const [deleteId, setdeleteId] = useState();
  const [editId, setEditId] = useState();

  const handleClose = () => setShow(false);
  const handleCloseEditModel = () => setShowEditModel(false);

  const handleShow = (id: SetStateAction<undefined>) => {
    setdeleteId(id);
    setShow(true);
  };

  const handleShowEditModel = (id: SetStateAction<undefined>) => {
    setEditId(id);
    setShowEditModel(true);
  };

  const { products, setUpdate, getDataFromChild, category } = props;

  const HtmlTooltip = styled(({ className, ...prop }: TooltipProps) => (
    <Tooltip {...prop} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: 12,
      border: "1px solid #dadde9",
      padding: 0,
    },
  }));

  console.log(products, "products");

  return (
    <>
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
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center">
                No Products Found
              </td>
            </tr>
          ) : (
            <>
              {products?.map((product: any) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.attributes.Name}</td>
                  <td>{product.attributes.SKU}</td>
                  <td>
                    {product.attributes.Stock ? "stock " : "out of stock"}
                  </td>
                  <td>{product.attributes.Price}</td>
                  <td>
                    {product.attributes.categorys?.data?.map(
                      (cat: any) => {
                       return <p>{cat.attributes.Name}</p>;
                      }
                    )}
                  </td>
                  <td>{product.attributes.publishedAt}</td>
                  <td>
                    <HtmlTooltip
                      title={
                        <StyledToolTip>
                          <button
                            onClick={() => handleShowEditModel(product.id)}
                          >
                            <FiEdit2 /> Edit
                          </button>
                          <button onClick={() => handleShow(product.id)}>
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
            </>
          )}
        </tbody>
      </Table>
      <ProductModelDelete
        show={show}
        handleClose={handleClose}
        setUpdate={setUpdate}
        deleteId={deleteId}
        getDataFromChild={getDataFromChild}
      />
      <ProductModelEdit
        getDataFromChild={getDataFromChild}
        products={products}
        editId={editId}
        show={showEditModel}
        handleClose={handleCloseEditModel}
        category={category}
      />
    </>
  );
}

export default ProductTable;

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
    svg {
      font-size: 18px;
    }
  }
`;
