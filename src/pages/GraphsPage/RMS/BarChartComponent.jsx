import { useEffect, useState } from "react";
import AOBarChart from "./AOBarChart";
import ChannelsData from "./ChannelsData.json";

const BarChartComponent = ({ max, min, heatmapRMSHeight, startAnimation }) => {
  const [rmsData, setRmsData] = useState([]);
  const [siteDepthArray, setSiteDepthArray] = useState([]);

  const DrawRMS = () => {
    console.log("ChannelsData", ChannelsData[0]);
    // console.log("ChannelsData NOR_RMS", ChannelsData[0].data.NOR_RMS);
    const NRMS = ChannelsData[0].data.NOR_RMS;
    const value_uMeter_array = [];
    const RMS_array = [];
    for (let index = 0; index < ChannelsData[0].data.SitesCount; index++) {
      value_uMeter_array.push(
        ChannelsData[0].data.depth[index].value_uMeter / 1000
      );
      RMS_array.push(ChannelsData[0].data.depth[index].RMS / NRMS);
    }

    console.log("value_uMeter_array", value_uMeter_array);
    console.log("RMS_array", RMS_array);

    // interval that will add a new value inserted to rmsData and siteDepthArray
    let index = 0;
    const interval = setInterval(() => {
      if (index < RMS_array.length - 1) {
        setSiteDepthArray((prev) => [...prev, value_uMeter_array[index]]);
        setRmsData((prev) => [...prev, RMS_array[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
  };

  useEffect(() => {
    console.log("barchart");
    if (startAnimation) {
      DrawRMS();
    }
  }, [startAnimation]);

  return (
    <div>
      <div
        style={{
          width: 200,
          backgroundSize: "13.5px 13.5px",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1px, transparent 1px)",
        }}
      >
        <AOBarChart
          isAbleDeleteRms={false} // TODO what is this?
          siteDepthArray={siteDepthArray}
          rmsData={rmsData}
          direction={"rtl"}
          marginTop={0}
          height={heatmapRMSHeight}
          max={max}
          min={min}
          max_nrms={5}
          handleDeleteFn={() => {}} // TODO what is this?
        />
      </div>
    </div>
  );
};

export default BarChartComponent;
