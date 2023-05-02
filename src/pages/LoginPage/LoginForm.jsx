import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LoginInputField from "./LoginInputField";
import { useGlobalContext } from "../contexts/GlobalContext";
const StyledForm = styled.div`
  grid-area: form;
  display: flex;
  flex-direction: column;
  margin-left: 13vw;
`;

const InputFeildsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  justify-content: start;
  width: fit-content;
`;

const LoginForm = () => {
  const {
    electrophysiologistName,
    setElectrophysiologistName,
    searchElectrophysiologistName,
    surgeonName,
    setSurgeonName,
    searchSurgeonName,
  } = useGlobalContext();
  return (
    <StyledForm>
      <h1>Please sign in to HaGuide</h1>
      <InputFeildsContainer>
        <LoginInputField
          value={electrophysiologistName}
          placeholder={"Enter Electrophysiologist Name"}
          setFunc={setElectrophysiologistName}
          searchFunc={searchElectrophysiologistName}
          type={"text"}
        />

        <LoginInputField
          value={surgeonName}
          placeholder={"Enter Surgeon Name"}
          setFunc={setSurgeonName}
          searchFunc={searchSurgeonName}
          type={"text"}
        />
        <LoginButton />
      </InputFeildsContainer>
    </StyledForm>
  );
};

export default LoginForm;
