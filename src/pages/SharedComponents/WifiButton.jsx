import styled from "styled-components";
import WifiButtonImageOff from "../../data/Icons/Offline.png";
import WifiButtonImageOn from "../../data/Icons/Online.png";
import React, { useState } from "react";

const StyledWifiButton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  justify-content: space-between;
  align-items: start;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  color: ${({ wifiStatus }) => (wifiStatus ? "green" : "red")};
`;

const WifiButton = () => {
  const [wifiStatus, setWifiStatus] = useState(false);
  const handleWifiStatus = () => {
    setWifiStatus(!wifiStatus);
  };

  return (
    <div>
      <StyledWifiButton wifiStatus={wifiStatus} onClick={handleWifiStatus}>
        <img
          src={wifiStatus ? WifiButtonImageOn : WifiButtonImageOff}
          alt="WifiButton"
          width={"30px"}
        />
        <div>{wifiStatus ? "Internet Access" : "No Internet Access"}</div>
      </StyledWifiButton>
    </div>
  );
};

export default WifiButton;
