import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  width: 300px;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoginButton = () => {
  // import the global context and the function to set the global context
  const { electrophysiologistName, surgeonName } = useGlobalContext();

  const navigate = useNavigate();
  const handleLogin = () => {
    window.localStorage.setItem("loggedIn", true);
    window.localStorage.setItem("electrophysiologistName", electrophysiologistName);
    window.localStorage.setItem("surgeonName", surgeonName);
    console.log("login");
    // navigate to preperation page
    navigate("/preparationpage");
  };

  return <StyledButton onClick={handleLogin}>Login</StyledButton>;
};

export default LoginButton;
