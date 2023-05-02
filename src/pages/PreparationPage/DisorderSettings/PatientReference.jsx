import React from "react";
import styled from "styled-components";

const StyledPatientReference = styled.input`
  border: 1px solid "black";
  border-radius: 5px;
  color: "black";
  font-size: 1.15em;
  margin-left: 0.5em;
  padding: 0.5em 0.5em 0.5em 0.5em;
  width: 200px;
  &:focus {
    border: 3px solid #a71a32;
    outline: none;
    ::placeholder {
      color: #fff;
    }
  }
`;

const PatientReference = ({
  value,
  setFunc,
  searchFunc,
  type,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor="mac address" style={{ marginRight: "4vw" }}>
        Patient Reference
      </label>

      <StyledPatientReference
        value={value}
        onChange={(e) => {
          setFunc(e.target.value);
          searchFunc(e.target.value);
        }}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default PatientReference;
