import React from "react";
import { useState } from "react";
import AOBarChart from "./AOBarChart";

const BarChartComponent = () => {
  const isAbleDeleteRms = false;
  const [siteDepthArray, setSiteDepthArray] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rmsData, setRmsData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);
  const [currentDepth, setCurrentDepth] = useState(15);
  const marginTop = 0;
  const height = 487;
  const direction = "rtl";
  const max = 15;
  const min = -3;
  const max_nrms = 4;
  const handleDeleteFn = () => {};

  const generateData = (depth = currentDepth) => {
    if (depth < 0 || !shouldUpdate) {
      return;
    }

    setCurrentDepth(depth);

    setSiteDepthArray((prevSiteDepthArray) => [
      ...prevSiteDepthArray,
      depth.toFixed(5),
    ]);
    let rmsValue;
    if (depth < 5) {
      rmsValue = 2 + Math.random();
    } else {
      rmsValue = Math.random();
    }
    setRmsData((prevRmsData) => [...prevRmsData, rmsValue.toFixed(5)]);

    if (shouldUpdate) {
      const newTimeoutId = setTimeout(() => {
        generateData(depth - 0.1);
      }, 5000 / ((15 - 0) * 10));
      setTimeoutId(newTimeoutId);
    }
  };

  const startRmsAnimation = () => {
    console.log("startRmsAnimation");
    setIsAnimating(!isAnimating);
    setShouldUpdate(!shouldUpdate);
    if (shouldUpdate) {
      generateData();
    } else {
      clearTimeout(timeoutId);
    }
  };

  return (
    <div>
      <button onClick={() => startRmsAnimation()}>
        {isAnimating ? "Stop RMS Animation" : "Start RMS Animation"}{" "}
      </button>
      <div
        style={{
          width: 226,
          backgroundSize: "13.5px 13.5px",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1px, transparent 1px)",
        }}
      >
        <AOBarChart
          isAbleDeleteRms={isAbleDeleteRms}
          siteDepthArray={siteDepthArray}
          rmsData={rmsData}
          direction={direction}
          marginTop={marginTop}
          height={height}
          max={max}
          min={min}
          max_nrms={max_nrms}
          handleDeleteFn={handleDeleteFn}
          animationDuration={4000}
        />
      </div>
    </div>
  );
};

export default BarChartComponent;
