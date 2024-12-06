import styled from "styled-components";
import HomeHeader from "./components/header.jsx";
import { useState } from "react";
const TABLE = styled.table`
  border-collapse: collapse;
  margin: auto;
  border: 1px solid black;

  tr:nth-child(even) {
    background-color: red;
  }

  tr:hover:nth-child(1n) {
    background-color: #085f63;
    color: #fff;
  }
`;

const TH = styled.th`
  padding: 10px;
  text-align: center;
  width: 120px;
  font-weight: bold;
  border: 1px solid black;
`;

const TD = styled.td`
  padding: 10px;
  text-align: center;
  width: 120px;
  border: 1px solid black;
`;

const MAIN = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
`;

const INPUT = styled.input`
  padding: 1rem;
  color: white;
  border: 1px solid black;
  border-radius: 0.5rem;
`;
const FILTRO = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
`;

export default function Home() {
  const produtos = [
    { nome: "Produto A", quantidade: 10, preco: 15.0 },
    { nome: "Produto B", quantidade: 5, preco: 25.0 },
    { nome: "Produto C", quantidade: 8, preco: 12.5 },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inicialDate, setInicialDate] = useState("")
  const [finalDate, setFinalDate] = useState("")
  const [month, setMonth] = useState("")

  const handleOnclick = (produto) => {
    setSelectedProduct(produto);
  };

  const handleOnChange = (month) => {
    setFinalDate("")
    setInicialDate("")
    setMonth(month);
  };

  return (
    <>
      <h2>Filtre por período ou mês</h2>
      <FILTRO>
        <div className="datas">
          <FILTRO>
            <h4>Data Inicial:</h4>
            <INPUT type="date" 
            value={inicialDate}
          onChange={(event) => setInicialDate(event.target.value)}
            />
          </FILTRO>
          <FILTRO>
            <h4>Data Final: </h4>
            <INPUT type="date" 
            value={finalDate}
          onChange={(event) => setFinalDate(event.target.value)}

            />
          </FILTRO>
        </div>
        <FILTRO>
          <h4>Selecione o mês</h4>
          <INPUT 
          type="month" 
          onChange={(event) => handleOnChange(event.target.value)}
          />
        </FILTRO>
      </FILTRO>

      <h1>Relatório de Vendas</h1>
      <MAIN>
        <TABLE border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <TH>Nome do Produto</TH>
              <TH>Quantidade Vendida</TH>
              <TH>Valor Total Vendido</TH>
              <TH>Clientes</TH>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, index) => (
              <tr key={index} onClick={() => handleOnclick(produto)}>
                <TD>{produto.nome}</TD>
                <TD>{produto.quantidade}</TD>
                <TD>R$ {(produto.quantidade * produto.preco).toFixed(2)}</TD>
                <TD> &rArr;</TD>
              </tr>
            ))}
          </tbody>
        </TABLE>

        {selectedProduct && (
          <TABLE>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index} onClick={() => handleOnclick(produto)}>
                  <TD>{produto.nome}</TD>
                  <TD>{produto.quantidade}</TD>
                  <TD>R$ {(produto.quantidade * produto.preco).toFixed(2)}</TD>
                </tr>
              ))}
            </tbody>
            {/* <tbody>
            <tr>
              <td><strong>Nome do Cliente:</strong></td>
              <td>{selectedProduct.clienteNome}</td>
            </tr>
            <tr>
              <td><strong>E-mail do Cliente:</strong></td>
              <td>{selectedProduct.clienteEmail}</td>
            </tr>
            <tr>
              <td><strong>Data da Compra:</strong></td>
              <td>{selectedProduct.dataCompra}</td>
            </tr>
          </tbody> */}
          </TABLE>
        )}
      </MAIN>
    </>
  );
}
