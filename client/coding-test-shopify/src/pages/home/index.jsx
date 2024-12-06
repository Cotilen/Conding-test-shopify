import styled from "styled-components";
import HomeHeader from "./components/header.jsx";
import { useState } from "react";
import { getOrdersByDate } from "../../services/Orders.js";
const TABLE = styled.table`
  border-collapse: collapse;
  margin: 1rem;
  border: 1px solid black;
  width: 45dvw;

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
  max-height: 80px;
  border: 1px solid black;
`;

const MAIN = styled.div`
  display: flex;
  align-items: start;
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
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inicialDate, setInicialDate] = useState(null)
  const [finalDate, setFinalDate] = useState(null)
  const [month, setMonth] = useState(null)

  const handleOnclick = (produto) => {
    setSelectedProduct(produto);
  };

  const handleOnChange = (month) => {
    setFinalDate("")
    setInicialDate("")
    setMonth(month);
  };

  const handleFilter =async () =>{
    if(inicialDate && finalDate){
      const response = await getOrdersByDate(inicialDate, finalDate)

      setProducts(response)
      setSelectedProduct("")
      
    }else if(month){
      console.log(month);
      
    }else{
      alert("Selecione as datas ou o mês que deseja filtrar")
    }

  }

  return (
    <>
     <div>
      <h2>Filtre por período ou mês</h2>
      <FILTRO>
        <div className="datas">
          <FILTRO>
            <h4>Data Inicial:</h4>
            <INPUT
              type="date"
              value={inicialDate}
              onChange={(event) => setInicialDate(event.target.value)}
            />
          </FILTRO>
          <FILTRO>
            <h4>Data Final:</h4>
            <INPUT
              type="date"
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

      {/* Botão de Filtrar */}
      <FILTRO>
        <button onClick={handleFilter}>Filtrar</button>
      </FILTRO>
    </div>

      <h1>Relatório de Vendas</h1>
      <MAIN>
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
              <tr key={index} onClick={() => handleOnclick(produto.customers)}>
                <TD>{produto.name}</TD>
                <TD>{produto.quantity_sold}</TD>
                <TD>R$ {(produto.total_sales_value).toFixed(2)}</TD>
                <TD> &rArr;</TD>
              </tr>
            ))}
          </tbody>
        </TABLE>

        {selectedProduct && (
         <TABLE border="1">
         <thead>
           <tr>
             <TH>Cliente</TH>
             <TH>Email</TH>
             <TH>Data de processamento</TH>
           </tr>
         </thead>
         <tbody>
           {selectedProduct.map((customers, index) => (
             <tr key={index} >
               <TD>{customers.name}</TD>
               <TD>{customers.email}</TD>
               <TD>{customers.process_date}</TD>
             </tr>
           ))}
         </tbody>
       </TABLE>
        )}
      </MAIN>
    </>
  );
}
