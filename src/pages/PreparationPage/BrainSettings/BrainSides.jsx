import React from "react";
import styled from "styled-components";
import BrainMenu from "./BrainMenu";

const StyledBrainSides = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  padding-top: 20vh;
`;

const BrainSides = () => {
  return (
    <StyledBrainSides>
      <BrainMenu side={"Left"} />
      <BrainMenu side={"Right"} />
    </StyledBrainSides>
  );
};

export default BrainSides;
