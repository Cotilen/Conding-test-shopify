import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  color: white;
  display: flex;
  width: 100%;
  height: 8vh;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;

  & ul {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    list-style-type: none;

    & li {
      text-decoration: none;
      font-size: 1.3rem;

      &:hover {
        cursor: pointer;
      }
    }


  }

  & img {
    max-height: 3.5vh;

    &:hover {
      cursor: pointer;
    }
  }

  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-left: 2rem;
    margin-right: 2rem;
    gap: 1rem;
  }

  @media(max-width:425px){
    justify-content: start;
    width: 100dvw;

      & ul {
        display: none;
      }
    }
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  border-radius: 3px;
`;

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <Header >
      <div>
        <ul>
          <li>Séries</li>
          <li>Filmes</li>
          <li>Minha Lista</li>
        </ul>
      </div>
      <div>
      </div>
    </Header>
  );
}