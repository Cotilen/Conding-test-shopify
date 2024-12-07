import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../../hooks/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/signIn.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = styled.form`
  width: 350px;
  height: auto;
  border: 1px solid #fff;
  border-radius: 1rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  & h1 {
    color: #00bcd4;
  }
  & a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  & div {
    width: 100%;
  }

  @media (max-width: 425px) {
    width: 310px;
    padding: 10px 10px;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  color: white;
  background: #1a1a1a;
  font-size: 1rem;
  margin-right: 1rem;
  border: 2px solid #fff;

  @media (max-width: 425px) {
    margin: 0;
  }
`;
const InputContainer = styled.div`
  width: 100%;
  border-radius: 4px;
`;
const Button = styled.button`
  width: 80%;
  color: white;
  border: black;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1.5rem;
`;

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { toggleAuthLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username ||!password) {
      toast.error("Preencha todos os campos!");
      return;
    }
    const toastId = toast.loading("Logando...");

    try {
      const login = await signIn({ user: username, password: password });
      const accessToken = login.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      toast.update(toastId, {
        render: "Login efeituado com sucesso!",
        type: toast.success,
        isLoading: false,
        autoClose: 2500,
      });

      toggleAuthLogin()
    navigate("/home")

    } catch (error) {
      if (error.status === 401) {
        toast.update(toastId, {
          render: "Erro! Email ou senha incorretos!",
          type: toast.success,
          isLoading: false,
          autoClose: 2500,
        });
      }
    }
  };
  return (
    <>
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
       <Form onSubmit={handleSubmit}>
      <div>
        <h1>Entrar</h1>
      </div>
      <InputContainer>
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <Button type="submit">Entrar</Button>
    </Form>
    </>
   
  );
}
