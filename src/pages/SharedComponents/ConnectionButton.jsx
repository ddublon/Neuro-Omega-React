import styled from "styled-components";
import ConnectionButtonImageOK from "../../data/Icons/con_ok.png";
import ConnectionButtonImageNoCon from "../../data/Icons/no_con.png";
import React, { useState } from "react";

const StyledConnectionButton = styled.button`
  --size: 30px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  color: ${({ connectionStatus }) => (connectionStatus ? "green" : "red")};
`;

const ConnectionButton = () => {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const handleConnectionStatus = () => {
    setConnectionStatus(!connectionStatus);
  };
  const buttonText = connectionStatus ? "Connected" : "Disconnected";

  return (
    <div>
      <StyledConnectionButton
        connectionStatus={connectionStatus}
        onClick={handleConnectionStatus}
      >
        <img
          src={
            connectionStatus
              ? ConnectionButtonImageOK
              : ConnectionButtonImageNoCon
          }
          alt="ConnectionButton"
          width={"30px"}
        />
        {buttonText}
      </StyledConnectionButton>
    </div>
  );
};

export default ConnectionButton;
