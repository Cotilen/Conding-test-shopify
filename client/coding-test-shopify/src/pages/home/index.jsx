import styled from "styled-components";
import HomeHeader from "./components/box.jsx";
import { useState } from "react";
import { formatToBRLDate } from "../../utils/formatDate.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "./components/box.jsx";

const TABLE = styled.table`
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
`;

const TH = styled.th`
  padding: 10px;
  text-align: center;
  width: 120px;
  font-weight: bold;
  border: 1px solid #b0bec5;
`;

const TD = styled.td`
  padding: 10px;
  text-align: center;
  width: 120px;
  max-height: 80px;
  border: 1px solid #b0bec5;
`;

const MAIN = styled.div`
  display: flex;
  align-items: start;
`;

const BORDER = styled.div`
  padding-top: 100px;
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


export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOnclick = (produto) => {
    setSelectedProduct(produto);
  };

  const handleFilter = async (itens) => {
    console.log(itens);
    
    setProducts(itens);
  };

  return (
    <BORDER>
      <H1>Relatório de Vendas</H1>

      <Box filterProducts={(products) => handleFilter(products)}/>
      	<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="dark"
			/>
      <MAIN>
        {!!products && products?.length ? (
          <TABLE border="1">
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
          </TABLE>
        ):(
          <TABLE>
          <h2>Nenhum produto encontrado.</h2>

          </TABLE>

        )}

        {selectedProduct && (
          <TABLE border="1">
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
          </TABLE>
        )}
      </MAIN>
    </BORDER>
  );
}
