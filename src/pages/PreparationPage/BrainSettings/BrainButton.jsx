import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../contexts/GlobalContext";

const StyledBrainButton = styled.button`
  display: inline;
  justify-content: start;
  text-align: start;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 0.5rem;
  background-color: ${(props) => props.bgColor || "#a71a32"};
  color: ${(props) => (props.bgColor === "#a71a32" ? "white" : "black")};
  font-size: 1.5em;
  border-radius: 5px;
  border: 2px solid ${(props) => props.borderColor || "#a71a32"};
  cursor: pointer;
  // change the color if the backround is #a71a32 then the color is white else the color is #a71a32
  color: ${(props) => (props.bgColor === "#a71a32" ? "white" : "#a71a32")};
`;

const BrainButton = ({ side }) => {
  const {
    isLeftBrainMenuOpen,
    setIsLeftBrainMenuOpen,
    isRightBrainMenuOpen,
    setIsRightBrainMenuOpen,
  } = useGlobalContext();
  const [BrainStatus, setBrainStatus] = useState(
    side === "Left" ? isLeftBrainMenuOpen : isRightBrainMenuOpen
  );

  const handleBrainClick = () => {
    if (side === "Left") {
      setIsLeftBrainMenuOpen(!isLeftBrainMenuOpen);
      window.localStorage.setItem("isLeftBrainMenuOpen", !isLeftBrainMenuOpen);
    } else if (side === "Right") {
      setIsRightBrainMenuOpen(!isRightBrainMenuOpen);
      window.localStorage.setItem(
        "isRightBrainMenuOpen",
        !isRightBrainMenuOpen
      );
    }
    setBrainStatus(!BrainStatus);
  };

  return (
    <StyledBrainButton
      onClick={handleBrainClick}
      bgColor={BrainStatus ? "#a71a32" : "white"}
      borderColor={BrainStatus ? "white" : "#a71a32"}
    >
      <b>{side}</b> Brain
    </StyledBrainButton>
  );
};

export default BrainButton;
