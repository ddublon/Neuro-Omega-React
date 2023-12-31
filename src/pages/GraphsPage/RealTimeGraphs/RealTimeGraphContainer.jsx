import { useEffect, useState } from "react";
import RealTimeGraph from "./RealTimeGraph";
import RMSPSDContainer from "../RMSPSDContainer";
import LFP from "../LFP/LFP";
import SEG from "../SEG/SEG";
import Counter from "./Counter";

const sites = ["Site1Data.json", "Site2Data.json"];
const titles = ["SPK 44khz", "RAW 44khz"];

const RealTimeGraphContainer = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [electrodeCounter, setElectrodeCounter] = useState(0);
  const [hiddenArray, setHiddenArray] = useState([]); // New state for hidden attribute
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("Site1Data.json");
        const jsonData = await response.json();
        setElectrodeCounter(jsonData.length);
        setHiddenArray(new Array(jsonData.length).fill(false)); // Set all values to false initially
      } catch (error) {
        console.error("Failed to fetch the data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAnimationToggle = () => {
    setIsAnimating((prevState) => !prevState);
  };

  const handleHideShow = (idx) => {
    // Function to control hidden attribute
    console.log("idx", idx);
    setHiddenArray((prevState) => {
      const newArray = [...prevState];
      newArray[idx] = !newArray[idx];
      console.log("newArray", newArray);
      return newArray;
    });
  };

  return (
    <div>
      <Counter startCounting={isAnimating} />
      <button onClick={handleAnimationToggle}>
        {isAnimating ? "Stop Animation" : "Start Animation"}
      </button>

      {Array.from({ length: electrodeCounter }).map((_, idx) => (
        <div key={idx}>
          <button onClick={() => handleHideShow(idx)}>
            {hiddenArray[idx]
              ? `show electrode ${idx}`
              : `hide electrode ${idx}`}
          </button>
          <h4>{`Electrode_${idx}`}</h4>
          {!hiddenArray[idx] && (
            <div className="flex" key={`container${idx}`}>
              <LFP electrodeNumber={idx} isAnimating={isAnimating} />
              <SEG electrodeNumber={idx} isAnimating={isAnimating} />
              {sites.map((site, i) => (
                <RealTimeGraph
                  key={`site-${i}-electrode-${idx}`}
                  isAnimating={isAnimating}
                  jsonSource={site}
                  title={titles[i]}
                  electrodeNumber={idx}
                />
              ))}

              <RMSPSDContainer key={`RMSPSDContainer-${idx}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RealTimeGraphContainer;
