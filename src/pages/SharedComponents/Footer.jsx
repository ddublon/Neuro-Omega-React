import React from "react";
import Navbar from "./Navbar";
import WifiButton from "./WifiButton";
import ConnectionButton from "./ConnectionButton";
import styled from "styled-components";
const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <WifiButton />
      <Navbar />
      <ConnectionButton />
    </StyledFooter>
  );
};

export default Footer;
