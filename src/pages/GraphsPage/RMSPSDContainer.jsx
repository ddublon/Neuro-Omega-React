import { useState } from "react";
import PSDComponent from "./PSD/PSDComponent";
import HgYAxis from "./YAxis/YAxis";
import BarChartComponent from "./RMS/BarChartComponent";

const RMSPSDContainer = () => {
  const [controlHeight, setControlHeight] = useState(600);
  const [startAnimation, setStartAnimation] = useState(false);
  const [intervalSpeed, setintervalSpeed] = useState(1000);
  const [heatmapRMSHeight, setheatmapRMSHeight] = useState(200);
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(22);
  const [maxNRMS, setmaxNRMS] = useState(5);
  const [direction, setdirection] = useState("rtl");
  const [minFreq, setminFreq] = useState(1);
  const [maxFreq, setmaxFreq] = useState(300);
  const [saturation, setsaturation] = useState(50);

  const unitHeight = heatmapRMSHeight / ((max - min) * 2);

  const startAnimationFunc = () => {
    setStartAnimation((prev) => !prev);
  };

  return (
    <div>
      <button onClick={() => startAnimationFunc()}>
        {startAnimation ? "Stop" : "Start"}
      </button>
      <div className={"container"}>
        <div className="flex">
          <BarChartComponent
            heatmapRMSHeight={heatmapRMSHeight}
            min={min}
            max={max}
            maxNRMS={maxNRMS}
            unitHeight={unitHeight}
            direction={direction}
            intervalSpeed={intervalSpeed}
            startAnimation={startAnimation}
          />
          <PSDComponent
            intervalSpeed={intervalSpeed}
            heatmapRMSHeight={heatmapRMSHeight}
            min={min}
            max={max}
            direction={direction}
            minFreq={minFreq}
            maxFreq={maxFreq}
            saturation={saturation}
            startAnimation={startAnimation}
          />
          <div>
            <HgYAxis
              direction={"ltr"}
              max={max}
              min={min}
              height={heatmapRMSHeight}
              step={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RMSPSDContainer;
