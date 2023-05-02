import React from "react";
import styled from "styled-components";
import BrainButton from "./BrainButton";
import ElectrodeMenu from "./ElectrodesSettings/ElectrodeMenu";
import { useGlobalContext } from "../../contexts/GlobalContext";

const StyledBrainMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1em;
`;

const BrainMenu = ({ side }) => {
  const {
    isLeftBrainMenuOpen,
    // setIsLeftBrainMenuOpen,
    isRightBrainMenuOpen,
    // setIsRightBrainMenuOpen,
  } = useGlobalContext();

  return (
    <StyledBrainMenu>
      <BrainButton side={side} />
      {(side === "Left" && isLeftBrainMenuOpen && (
        <ElectrodeMenu side={side} />
      )) ||
        (side === "Right" && isRightBrainMenuOpen && (
          <ElectrodeMenu side={side} />
        ))}
    </StyledBrainMenu>
  );
};

export default BrainMenu;
