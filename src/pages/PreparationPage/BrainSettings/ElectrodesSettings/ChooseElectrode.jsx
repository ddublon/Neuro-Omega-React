import React, { useState } from "react";
import styled from "styled-components";
import ElectrodesDropDownMenu from "./ElectrodesDropDownMenu";

const StyledChooseElectrode = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    height: 100%;
  }

  .box {
    padding: 10px;
    font-size: 24px;
    text-align: center;
  }
`;

const ChooseElectrode = ({ side, electrodeNumbers, setElectrodeNumbers }) => {
  const electrodeCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div>ChooseElectrode</div>
      <StyledChooseElectrode>
        <div className="container">
          {electrodeCells.map((cellNumber) => {
            return (
              <ElectrodesDropDownMenu
                key={cellNumber}
                cellNumber={cellNumber}
                side={side}
                electrodeNumbers={electrodeNumbers}
                setElectrodeNumbers={setElectrodeNumbers}
              />
            );
          })}
        </div>
      </StyledChooseElectrode>
    </>
  );
};

export default ChooseElectrode;
