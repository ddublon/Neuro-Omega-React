import { useEffect, useState } from "react";
import AOBarChart from "./AOBarChart";

const BarChartComponent = ({
  max,
  min,
  heatmapRMSHeight,
  unitHeight,
  maxNRMS,
  direction,
  intervalSpeed,
  startAnimation,
}) => {
  const [rmsData, setRmsData] = useState([]);
  const [siteDepthArray, setSiteDepthArray] = useState([]);

  useEffect(() => {
    const fetchChannelsData = async () => {
      const response = await fetch("./ChannelsData.json");
      const ChannelsData = await response.json();
      // console.log("ChannelsData", ChannelsData[0]);
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

      const addRMSDataWithDelay = (array, delay) => {
        array.forEach((item, index) => {
          setTimeout(() => {
            setRmsData((prevRmsData) => [...prevRmsData, item]);
          }, delay * (index + 1));
        });
      };

      const addSiteDepthArrayWithDelay = (array, delay) => {
        array.forEach((item, index) => {
          setTimeout(() => {
            setSiteDepthArray((prevSiteDepthArray) => [
              ...prevSiteDepthArray,
              item,
            ]);
          }, delay * (index + 1));
        });
      };

      addRMSDataWithDelay(RMS_array, 1000);
      addSiteDepthArrayWithDelay(value_uMeter_array, 1000);
    };

    if (startAnimation) {
      fetchChannelsData();
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
          direction={direction}
          marginTop={0}
          height={heatmapRMSHeight}
          unitHeight={unitHeight}
          max={max}
          min={min}
          max_nrms={maxNRMS}
          handleDeleteFn={() => {}} // TODO what is this?
        />
      </div>
    </div>
  );
};

export default BarChartComponent;
