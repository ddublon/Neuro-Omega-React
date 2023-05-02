import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import NOimage from "./NOimage";

const LoginPageCssGrid = styled.div`
  margin-top: 40vh;
  width: 100%;
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "form form form image image";
`;

const LoginPageComponent = () => {
  return (
    <LoginPageCssGrid>
      <LoginForm />
      <NOimage />
    </LoginPageCssGrid>
  );
};

export default LoginPageComponent;
