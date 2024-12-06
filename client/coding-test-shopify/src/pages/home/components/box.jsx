import React, { useState } from "react";
import styled from "styled-components";
import { getOrdersByDate, getOrdersByMonth } from "../../../services/Orders.js";


const PeriodoContainer = styled.div`
  border: 1px solid #00bcd4;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #333333;
  max-width: 800px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .icon {
    font-size: 1.5rem;
    color: #00bcd4;
  }

  h3 {
    margin: 0;
    color: #00bcd4;
  }
`;

const Fields = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label {
    font-size: 0.9rem;
    color: #333;
    display: block;
    margin-bottom: 0.5rem;
  }

  select,
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  width: 80%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Dates = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.8rem;
    color: #555;
  }

  input {
    margin-top: 0.2rem;
  }
`;

const Box = ({filterProducts}) => {
  const [initialDate, setInitialDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [month, setMonth] = useState(null);

  const handleFilter = async () =>{
    if (initialDate && finalDate) {
      const response = await getOrdersByDate(initialDate, finalDate);

      filterProducts(response)
      setSelectedProduct("");
    } else if (month) {
      const response = await getOrdersByMonth(month);

      filterProducts(response)
      setSelectedProduct("");
    } else {
      toast.error("Selecione as datas ou o mês que deseja filtrar");
    }
  }

  return (
    <PeriodoContainer>
      <Header>
        <span className="icon">📅</span>
        <h3>Filtre por período ou mês::</h3>
      </Header>
      <Fields>
        <Field>
          <Dates>
            <div>
              <label htmlFor="data-inicial">Data Inicial</label>
              <input
                type="date"
                id="data-inicial"
                value={initialDate}
                onChange={(e) => setInitialDate(e.target.value)}
              />
            </div>
          </Dates>

          <Dates>
            <div>
              <label htmlFor="data-inicial">Mês Específico</label>
              <input
                type="month"
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
          </Dates>
        </Field>
        <Field>
          <Dates>
            <div>
              <label htmlFor="data-final">Data Final</label>
              <input
                type="date"
                id="data-final"
                value={finalDate}
                onChange={(e) => setFinalDate(e.target.value)}
              />
            </div>
          </Dates>
          <Button onClick={handleFilter}>Filtrar</Button>
        </Field>
      </Fields>
    </PeriodoContainer>
  );
};

export default Box;