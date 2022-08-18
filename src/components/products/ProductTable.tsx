import Table from "react-bootstrap/Table";

function ProductTable(props: any) {
  const { products } = props;
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
        </tr>
      </thead>
      <tbody>
        {
          (products.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">No Products Found</td>
            </tr>
          ))
        }
        {products?.map((product: any) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.attributes.Name}</td>
            <td>{product.attributes.SKU}</td>
            <td>{product.attributes.Stock ? "stock " : "out of stock"}</td>
            <td>{product.attributes.Price}</td>
            <td>{product.attributes.Categories}</td>
            <td>{product.attributes.publishedAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductTable;
