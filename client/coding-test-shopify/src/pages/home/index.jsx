import styled from "styled-components";
import HomeHeader from "./components/box.jsx";
import { useState } from "react";
import { formatToBRLDate } from "../../utils/formatDate.js";

import Box from "./components/box.jsx";

const ProductsTable = styled.table`
  border-collapse: collapse;
  margin: 1rem;
  border: 1px solid #b0bec5;
  width: 45dvw;

  tr:nth-child(even) {
    background-color: #212121;
  }

  tr:hover:nth-child(1n) {
    background-color: #00bcd4;
    color: #000;
    font-weight: bold;
  }

  
  @media (max-width: 1200px) {
    width: auto;
  }

  @media (max-width: 375px) {
    margin: 0;
    margin-top: 10px;
    max-width: 350px;
    font-size: 0.7rem;

  }
`;

const CustomersTable = styled.table`
  border-collapse: collapse;
  margin: auto;
  border: 1px solid #b0bec5;
  width: 45dvw;

  tr:nth-child(even) {
    background-color: #212121;
  }

  @media (max-width: 1200px) {
    width: auto;
  }

  @media (max-width: 425px) {
    margin: 1rem;
  }

  @media (max-width: 375px) {
    font-size: 0.7rem;
    margin: 0;
  }
  
`;

const TH = styled.th`
  padding: 10px;
  text-align: center;
  width: 120px;
  font-weight: bold;
  border: 1px solid #b0bec5;

  @media (max-width: 425px) {
    padding: 5px;
  }
`;

const TD = styled.td`
  padding: 10px;
  text-align: center;
  width: 120px;
  max-height: 80px;
  border: 1px solid #b0bec5;

  @media (max-width: 425px) {
    padding: 5px;

  }
`;

const MAIN = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  grid-area: products;
`;

const BORDER = styled.div`
  padding-top: 100px;
  width: 100%;
  display: grid;
  grid-template-areas: "customers products";
  grid-template-columns: 1fr 1fr;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const H1 = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #1c1c1c;
  color: white;
  z-index: 1000;
  padding: 20px 0;
  text-align: center;
  font-size: 2rem;
`;

const Customers = styled.div`
  grid-area: customers;
  gap: 2rem;

`;

const FilterBox = styled(Box)`
`

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOnclick = (produto) => {
    setSelectedProduct(produto);
  };

  const handleFilter = async (itens) => {
    setProducts(itens);
  };

  return (
    <BORDER>
      <H1>Relatório de Vendas</H1>
      <Customers>
      <FilterBox
        filterProducts={(products) => handleFilter(products)}
        onClick={(customers) => handleOnclick(customers)}
      />

      {selectedProduct && (
        <CustomersTable border="1">
          <thead>
            <tr>
              <TH>Cliente</TH>
              <TH>Email</TH>
              <TH>Data de Processamento</TH>
            </tr>
          </thead>
          <tbody>
            {selectedProduct.map((customers, index) => (
              <tr key={index}>
                <TD>{customers.name}</TD>
                <TD>{customers.email}</TD>
                <TD>{formatToBRLDate(customers.process_date)}</TD>
              </tr>
            ))}
          </tbody>
        </CustomersTable>
      )}
      </Customers>

      
      <MAIN>
        {!!products && products?.length ? (
          <ProductsTable border="1">
            <thead>
              <tr>
                <TH>Nome do Produto</TH>
                <TH>Quantidade Vendida</TH>
                <TH>Valor Total Vendido</TH>
                <TH>Clientes</TH>
              </tr>
            </thead>
            <tbody>
              {products.map((produto, index) => (
                <tr
                  key={index}
                  onClick={() => handleOnclick(produto.customers)}
                >
                  <TD>{produto.name}</TD>
                  <TD>{produto.quantity_sold}</TD>
                  <TD>R$ {produto.total_sales_value.toFixed(2)}</TD>
                  <TD> &rArr;</TD>
                </tr>
              ))}
            </tbody>
          </ProductsTable>
        ) : (
          <ProductsTable>
            <h2>Nenhum produto encontrado.</h2>
          </ProductsTable>
        )}
      </MAIN>
    </BORDER>
  );
}
