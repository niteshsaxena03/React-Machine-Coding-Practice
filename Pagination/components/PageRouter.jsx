import { useEffect, useState } from "react";

export const PageRouter = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const result = await response.json();
    console.log(result);
    setData(result.products);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>Pagination</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          margin: 10,
        }}
      >
        {data.slice((currentPage - 1) * 10, currentPage * 10).map((product) => {
          return (
            <span style={{ margin: 5, border: "1px solid black", padding: 5 }}>
              {product.id}
            </span>
          );
        })}
      </div>
      <div>
        {currentPage > 1 && (
          <span onClick={() => setCurrentPage(currentPage - 1)}>⬅️</span>
        )}
        {pageNumbers.map((num) => {
          return (
            <span
              style={{ margin: 5, border: "1px solid black", padding: 5 }}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </span>
          );
        })}
        {currentPage < 10 && (
          <span onClick={() => setCurrentPage(currentPage + 1)}>➡️</span>
        )}
      </div>
    </div>
  );
};
