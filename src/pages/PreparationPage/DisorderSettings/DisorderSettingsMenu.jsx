import React from "react";
import MacAddress from "./MacAddress";
import PatientReference from "./PatientReference";
import DisorderDropDownMenu from "./DisorderDropDownMenu";
import styled from "styled-components";
import { useGlobalContext } from "../../contexts/GlobalContext";

const StyledDisorderSettingsMenu = styled.div`
  position: relative; /* add position relative to parent */
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  padding-top: 25vh;
  padding-right: 5vw;
  align-items: center;
  align-content: center;
  gap: 1em;

  /* add ::after pseudo-element with absolute positioning */
  &::after {
    content: "";
    position: absolute;
    top: 70%; /* position it in the middle */
    right: 0; /* position it on the right side */
    transform: translateY(-50%); /* center it vertically */
    height: 90%; /* set its height to half of the parent height */
    border-right: 2px solid #a71a32; /* set the border style and color */
  }
`;

const DisorderSettingsMenu = () => {
  const {
    macAdressValue,
    setMacAdressValue,
    searchMacAdressValue,
    patienteReferenceValue,
    setPatienteReferenceValue,
    searchPatienteReferenceValue,
  } = useGlobalContext();

  return (
    <StyledDisorderSettingsMenu>
      <MacAddress
        value={macAdressValue}
        setFunc={setMacAdressValue}
        searchFunc={searchMacAdressValue}
        type={"text"}
        placeholder={"Mac Address"}
      />
      <PatientReference
        value={patienteReferenceValue}
        setFunc={setPatienteReferenceValue}
        searchFunc={searchPatienteReferenceValue}
        type={"text"}
        placeholder={"Patient Reference"}
      />
      <DisorderDropDownMenu />
    </StyledDisorderSettingsMenu>
  );
};

export default DisorderSettingsMenu;
