import React, { useState } from "react";
import styled from "styled-components";
import ChooseBengun from "./ChooseBengun";
import ChooseElectrode from "./ChooseElectrode";

const StyledElectrodeMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1em;
`;

const ElectrodeMenu = ({ side }) => {
  const [electrodeNumbers, setElectrodeNumbers] = useState([1, 2, 3, 4, 5]);
  return (
    <StyledElectrodeMenu>
      <ChooseBengun side={side} />
      <ChooseElectrode
        side={side}
        electrodeNumbers={electrodeNumbers}
        setElectrodeNumbers={setElectrodeNumbers}
      />
    </StyledElectrodeMenu>
  );
};

export default ElectrodeMenu;
