import { DynamicPsdHeatMap } from "./DynamicPsdHeatMap";
import ChannelsData from "./ChannelsData.json";
import { useEffect, useState } from "react";

const SCALER_HEIGHT = 25;

const PSDComponent = ({ heatmapRMSHeight, min, max, startAnimation }) => {
  // please explain the how to use all sites data parameter and why it doesnt work with null?

  const [newSiteData, setNewSiteData] = useState(null);

  const startAnimationFunc = () => {
    const value_uMeter_array = [];
    const PSD_Power_array = [];

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

    console.log("value_uMeter", value_uMeter_array);
    console.log("One Row PSD_Power", PSD_Power_array_2[0]);
    setNewSiteData({
      depth: value_uMeter_array[0] / 1000,
      stride: 0.3,
      startFreq: 4,
      psd: PSD_Power_array_2[0],
    });

    const ChangeNewSiteData = (
      index,
      value_uMeter_array,
      PSD_Power_array_2
    ) => {
      console.log(value_uMeter_array[index] / 1000, PSD_Power_array_2[index]);
      setNewSiteData({
        depth: value_uMeter_array[index] / 1000,
        stride: 0.3,
        startFreq: 4,
        psd: PSD_Power_array_2[index],
      });
    };

    let index = 0;
    const interval = setInterval(() => {
      if (index < value_uMeter_array.length) {
        ChangeNewSiteData(index, value_uMeter_array, PSD_Power_array_2);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {
    if (startAnimation) {
      startAnimationFunc();
    }
  }, [startAnimation]);

  return (
    <>
      <div>
        <DynamicPsdHeatMap
          xDirection="rtl"
          showLegend={true}
          saturation={50}
          widgetSize={{ width: 200, height: heatmapRMSHeight + SCALER_HEIGHT }}
          viewPort={{
            freqRange: [1, 40],
            depthRange: [max, min],
          }}
          newSiteData={newSiteData}
        />
      </div>
    </>
  );
};

export default PSDComponent;
