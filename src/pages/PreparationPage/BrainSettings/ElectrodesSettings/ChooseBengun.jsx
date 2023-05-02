import React from "react";
import styled from "styled-components";
import CrossBengun from "../../../../data/Icons/Cross.png";
import PlusBengun from "../../../../data/Icons/Plus.png";
import { useState } from "react";

const StyledChooseBengun = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1em;
`;

const ChooseBengun = ({ side }) => {
  const imageWidth = "100px";
  const [bengun, setBengun] = useState({ cross: false, plus: false });
  const handleBengun = ({ cross, plus }) => {
    setBengun({ cross, plus });
    // set in local storage the bengun type and the side
    window.localStorage.setItem(
      `bengun${side}`,
      JSON.stringify({ cross, plus })
    );
  };

  return (
    <StyledChooseBengun>
      ChooseBengun:
      <img
        onClick={() => {
          handleBengun({ cross: true, plus: false });
        }}
        src={CrossBengun}
        alt="CrossBengun"
        width={imageWidth}
        style={{
          cursor: "pointer",
          border: bengun.cross ? "2px solid #a71a32" : "none",
        }}
      />
      <img
        onClick={() => {
          handleBengun({ cross: false, plus: true });
        }}
        style={{
          cursor: "pointer",
          border: bengun.plus ? "2px solid #a71a32" : "none",
        }}
        src={PlusBengun}
        alt="PlusBengun"
        width={imageWidth}
      />
    </StyledChooseBengun>
  );
};

export default ChooseBengun;
