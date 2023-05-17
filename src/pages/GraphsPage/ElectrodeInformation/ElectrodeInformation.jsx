import React, { useState } from "react";
import styled from "styled-components";
import RealTimeGraphContainer from "../RealTimeGraphContainer";
import BarChartComponent from "../NRMS/BarChartComponent";
import PSDComponent from "../PSD/PSDComponent";

const StyledElectrodeInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;

const ElectrodeInformation = () => {
  const [count, setCount] = useState(1);

  const handleChange = (event) => {
    setCount(parseInt(event.target.value, 10));
  };

  return (
    <StyledElectrodeInformation>
      <div>ElectrodeInformation</div>
      <select value={count} onChange={handleChange}>
        {Array.from({ length: 10 }, (_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      {Array(count)
        .fill()
        .map((_, index) => (
          <>
            <RealTimeGraphContainer key={index} />
          </>
        ))}
    </StyledElectrodeInformation>
  );
};

export default ElectrodeInformation;
