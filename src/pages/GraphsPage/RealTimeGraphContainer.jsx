import React, { useState } from "react";
import RealTimeGraph from "./RealTimeGraph";
import PSDComponent from "./PSD/PSDComponent";
import BarChartComponent from "./NRMS/BarChartComponent";
import RMSPSDContainer from "./RMSPSDContainer";

const RealTimeGraphContainer = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimationToggle = () => {
    setIsAnimating((prevState) => !prevState);
  };
  return (
    <div>
      <button onClick={handleAnimationToggle}>
        {isAnimating ? "Stop Animation" : "Start Animation"}
      </button>
      <span className={"flex"}>
        <RealTimeGraph isAnimating={isAnimating} title={"SPK"} />
        <RealTimeGraph isAnimating={isAnimating} title={"RAW"} />
        <RealTimeGraph isAnimating={isAnimating} title={"LFP"} />
        <RealTimeGraph isAnimating={isAnimating} title={"SEG"} />

        <RMSPSDContainer />
      </span>
    </div>
  );
};

export default RealTimeGraphContainer;
