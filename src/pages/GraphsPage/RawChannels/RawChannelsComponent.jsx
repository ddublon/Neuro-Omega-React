import "./App.css";
import { useState } from "react";
import { DynamicPsdHeatMap } from "./DynamicPsdHeatMap";

const createInitialAllSitesData = () => {
  const numberOfSites = 25;

  const generateRandomData = (length) =>
    Array.from({ length }, () => (Math.random() * 4 - 4).toFixed(5));

  const generateRandomDataForSites = (numberOfSites, dataLength) =>
    Array.from({ length: numberOfSites }, () => generateRandomData(dataLength));

  return {
    siteDepth: Array.from({ length: numberOfSites }, (_, i) => 10 - i * 0.4),
    stride: 0.3,
    startFreq: 3,
    psd: [].concat(...generateRandomDataForSites(numberOfSites, 100)),
  };
};
const initialAllSitesData = createInitialAllSitesData();
const psdArray = initialAllSitesData.psd;
console.log({ psdArray });





const RawChannelsComponent = () => {
  const [intervalID, setIntervalID] = useState(null);
  const [allSitesData, setAllSitesData] = useState({
    ...initialAllSitesData,
    psd: [],
  });

  const [animationInProgress, setAnimationInProgress] = useState(false);

  const startAnimation = () => {
    if (!animationInProgress) {
      setAnimationInProgress(true);

      const animate = setInterval(() => {
        setAllSitesData(() => ({ ...initialAllSitesData }));
      }, 1000);

      setIntervalID(animate);
    }
  };

  const stopAnimation = () => {
    setAnimationInProgress(false);
    clearInterval(intervalID);
  };

  return (
    <>
      <button onClick={startAnimation} disabled={animationInProgress}>
        Start Animation
      </button>
      <button onClick={stopAnimation} disabled={!animationInProgress}>
        Stop Animation
      </button>
      <DynamicPsdHeatMap
        xDirection="rtl"
        showLegend={true}
        widgetSize={{ width: 400, height: 600 }}
        saturation={1}
        viewPort={{ freqRange: [0, 12], depthRange: [10, -1] }}
        newSiteData={{
          depth: 9.8,
          stride: 0.3,
          startFreq: 3,
          psd: ["-2.19741", "-1.96798"],
        }}
        allSitesData={allSitesData}
      />
    </>
  );
};
export default RawChannelsComponent;
