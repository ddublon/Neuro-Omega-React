import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { useGlobalContext } from "../../contexts/GlobalContext";

const DisorderDropDownMenu = () => {
  const { disorder, searchDisorder } = useGlobalContext();

  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{ background: "#a71a32", width: "150px", border: "none" }}
        id="dropdown-basic"
      >
        {disorder}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          as="button"
          onClick={() => {
            searchDisorder("PD");
          }}
        >
          PD
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            searchDisorder("Dyt");
          }}
        >
          Dyt
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            searchDisorder("OCD");
          }}
        >
          OCD
        </Dropdown.Item>

        <Dropdown.Item
          as="button"
          onClick={() => {
            searchDisorder("Tremor");
          }}
        >
          Tremor
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DisorderDropDownMenu;
