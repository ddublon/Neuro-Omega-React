import React, { useContext, useState } from "react";

const GlobalContext = React.createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [electrophysiologistName, setElectrophysiologistName] = useState("");
  const [surgeonName, setSurgeonName] = useState("");
  const [patienteReferenceValue, setPatienteReferenceValue] = useState("");
  const [macAdressValue, setMacAdressValue] = useState("aa:bb:cc:dd:ee:ff");
  const [disorder, setDisorder] = useState("Select Disorder");
  const [isLeftBrainMenuOpen, setIsLeftBrainMenuOpen] = useState(true);
  const [isRightBrainMenuOpen, setIsRightBrainMenuOpen] = useState(false);

  // TODO for future developer , save the selected electrodes in this array maybe change its names to selectedElectrodesArray
  const [selectedElectrodesArray, setSelectedElectrodesArray] = useState({
    LeftBrain: [],
    RightBrain: [],
  });

  const searchElectrophysiologistName = (search) => {
    // remember to add the async to the function and the await , and fetch the data from the servers here
    if (search === "") {
      return;
    }
    console.log(search);
  };

  const searchSurgeonName = (search) => {
    if (search === "") {
      return;
    }
    console.log(search);
  };

  const searchPatienteReferenceValue = (search) => {
    // remember to add the async to the function and the await , and fetch the data from the servers here
    if (search === "") {
      return;
    }
    console.log(search);
    window.localStorage.setItem("patienteReference", search);
  };

  const searchMacAdressValue = (search) => {
    // remember to add the async to the function and the await , and fetch the data from the servers here
    if (search === "") {
      return;
    }
    console.log(search);
    window.localStorage.setItem("macAdress", search);
  };

  const searchDisorder = (search) => {
    // remember to add the async to the function and the await , and fetch the data from the servers here
    if (search === "") {
      return;
    }
    console.log(search);
    window.localStorage.setItem("disorder", search);
    setDisorder(search);
  };

  return (
    <GlobalContext.Provider
      value={{
        electrophysiologistName,
        setElectrophysiologistName,
        searchElectrophysiologistName,
        surgeonName,
        setSurgeonName,
        searchSurgeonName,
        patienteReferenceValue,
        setPatienteReferenceValue,
        searchPatienteReferenceValue,
        macAdressValue,
        setMacAdressValue,
        searchMacAdressValue,
        disorder,
        setDisorder,
        searchDisorder,
        isLeftBrainMenuOpen,
        setIsLeftBrainMenuOpen,
        isRightBrainMenuOpen,
        setIsRightBrainMenuOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
