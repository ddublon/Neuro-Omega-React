import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";

const ElectrodesDropDownMenu = ({
  setElectrodeNumbers,
  electrodeNumbers,
  side,
  cellNumber,
}) => {
  const [chosenElectrode, setChosenElectrode] = useState("");
  const chooseElectrode = (electrodeNumber) => {
    setChosenElectrode(electrodeNumber);
    // delete the chosen eletrode number from the array
    setElectrodeNumbers(
      electrodeNumbers.filter((number) => number !== electrodeNumber)
    );
    // set or concat the electode to local storage array of electrodes numbers and cells and side
    const electrode = {
      electrodeNumber: electrodeNumber,
      cellNumber: cellNumber,
    };
    const electrodes =
      JSON.parse(localStorage.getItem(`${side}Electrodes`)) || [];
    electrodes.push(electrode);
    localStorage.setItem("electrodes", JSON.stringify(electrodes));
  };

  return (
    <div className="box">
      <Dropdown>
        <Dropdown.Toggle
          style={{ background: "#a71a32", width: "40px", border: "none" }}
          id="dropdown-basic"
        >
          {chosenElectrode}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {electrodeNumbers.map((electrodeNumber) => {
            return (
              <Dropdown.Item
                as="button"
                key={electrodeNumber}
                onClick={() => {
                  chooseElectrode(electrodeNumber);
                }}
              >
                {electrodeNumber}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ElectrodesDropDownMenu;
