import React from "react";
import styled from "styled-components";
import DisorderSettingsMenu from "./DisorderSettings/DisorderSettingsMenu";
import BrainSides from "./BrainSettings/BrainSides";

const StyledPreparationPage = styled.div`
  margin-left: 2vw;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  padding-right: 2rem;
`;

const PreparationPageComponent = () => {
  return (
    <StyledPreparationPage>
      <DisorderSettingsMenu />
      <BrainSides />
    </StyledPreparationPage>
  );
};

export default PreparationPageComponent;
