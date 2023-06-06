import { useState } from "react";
import PSDComponent from "./PSD/PSDComponent";
import HgYAxis from "./YAxis/YAxis";
import BarChartComponent from "./RMS/BarChartComponent";

const RMSPSDContainer = () => {
  const [controlHeight, setControlHeight] = useState(600);
  const [startAnimation, setStartAnimation] = useState(false);
  const MM_IN_PIXELS_LARGE_SCALE = 27;
  const max = 28;
  const min = -4;
  const heatmapRMSHeight =
    (max - min) * MM_IN_PIXELS_LARGE_SCALE + 1 - controlHeight;

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
            startAnimation={startAnimation}
          />
          <PSDComponent
            heatmapRMSHeight={heatmapRMSHeight}
            min={min}
            max={max}
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
