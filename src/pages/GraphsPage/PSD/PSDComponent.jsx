import { DynamicPsdHeatMap } from "./DynamicPsdHeatMap";
// import ChannelsData from "./ChannelsData.json";
import { useEffect, useState } from "react";

const SCALER_HEIGHT = 25;

const PSDComponent = ({
  heatmapRMSHeight,
  min,
  max,
  direction,
  minFreq,
  maxFreq,
  saturation,
  intervalSpeed,
  startAnimation,
}) => {
  // please explain the how to use all sites data parameter and why it doesnt work with null?

  const [newSiteData, setNewSiteData] = useState(null);

  useEffect(() => {
    const value_uMeter_array = [];
    const PSD_Power_array = [];
    const fetchData = async () => {
      const response = await fetch("./ChannelsData.json");
      const ChannelsData = await response.json();
      // console.log("ChannelsData ", ChannelsData);
      for (let index = 0; index < ChannelsData[0].data.SitesCount; index++) {
        value_uMeter_array.push(ChannelsData[0].data.depth[index].value_uMeter);
        PSD_Power_array.push(ChannelsData[0].data.depth[index].PSD_Power);
      }
      const PSD_Power_array_2 = PSD_Power_array.map((array) => {
        const new_array = array.map((array2) => {
          return array2[0];
        });
        return new_array;
      });
      // console.log("value_uMeter", value_uMeter_array);
      // console.log("One Row PSD_Power", PSD_Power_array_2[0]);

      const addPSDDataWithDelay = (
        value_uMeter_array,
        PSD_Power_array_2,
        delay
      ) => {
        value_uMeter_array.forEach((item, index) => {
          setTimeout(() => {
            setNewSiteData({
              depth: item / 1000,
              stride: 0.3,
              startFreq: 4,
              psd: PSD_Power_array_2[index],
            });
          }, delay * (index + 1));
        });
      };
      addPSDDataWithDelay(value_uMeter_array, PSD_Power_array_2, 1000);
    };
    if (startAnimation) {
      fetchData();
    }
  }, [startAnimation]);

  return (
    <>
      <div>
        <DynamicPsdHeatMap
          xDirection={direction}
          showLegend={true}
          saturation={saturation}
          widgetSize={{ width: 200, height: heatmapRMSHeight + SCALER_HEIGHT }}
          viewPort={{
            freqRange: [minFreq, maxFreq],
            depthRange: [max, min],
          }}
          newSiteData={newSiteData}
        />
      </div>
    </>
  );
};

export default PSDComponent;
