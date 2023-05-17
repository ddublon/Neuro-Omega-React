import React, { useState } from "react";
import { DynamicPsdHeatMap } from "./DynamicPsdHeatMap";

// const createInitialAllSitesData = () => {
//   const numberOfSites = 25;

//   const generateRandomData = (length) =>
//     Array.from({ length }, () => (Math.random() * 4 - 4).toFixed(5));

//   const generateRandomDataForSites = (numberOfSites, dataLength) =>
//     Array.from({ length: numberOfSites }, () => generateRandomData(dataLength));

//   return {
//     siteDepth: Array.from({ length: numberOfSites }, (_, i) => 10 - i * 0.4),
//     stride: 0.3,
//     startFreq: 3,
//     psd: [].concat(...generateRandomDataForSites(numberOfSites, 100)),
//   };
// };
// const getNewSiteData = (depth) => {
//   const numberOfSites = 25;
//   const generateRandomData = (length) =>
//     Array.from({ length }, () => (Math.random() * 4 - 4).toFixed(5));

//   return {
//     depth,
//     stride: 0.3,
//     startFreq: 3,
//     psd: [].concat(...generateRandomData(100)),
//   };
// };

const PSDComponent = ({
  initialAllSitesData,
  allSitesData,
  setAllSitesData,
  newSiteData,
  setNewSiteData,
  viewPort,
  setViewPort,
  animationInProgress,
  setAnimationInProgress,
}) => {
  // const initialAllSitesData = createInitialAllSitesData();
  const psdArray = initialAllSitesData.psd;
  // console.log({ psdArray });
  // const [intervalIDPSD, setintervalIDPSD] = useState(null);

  // const [allSitesData, setAllSitesData] = useState({
  //   // ...initialAllSitesData,
  //   siteDepth: [],
  //   stride: 0.3333333333,
  //   startFreq: 3,
  //   psd: [],
  // });

  // const [newSiteData, setNewSiteData] = useState(null);

  // const [viewPort, setViewPort] = useState({
  //   freqRange: [3, 12],
  //   depthRange: [10, -1],
  // });

  // const [animationInProgress, setAnimationInProgress] = useState(false);

  // let depth = 10;
  // const startAnimation = () => {
  //   if (!animationInProgress) {
  //     setAnimationInProgress(true);

  //     const animate = setInterval(() => {
  //       // setAllSitesData(() => ({ ...initialAllSitesData }));
  //       const newData = getNewSiteData(depth);
  //       // console.log("TCL: animate -> newData", newData);
  //       depth -= 0.2;
  //       setNewSiteData(newData);

  //       // drive deeper than plan, need to adjust the viewport
  //       if (depth < viewPort.depthRange[1]) {
  //         const newViewPort = { ...viewPort };
  //         newViewPort.depthRange[1] -= 2; // reserve 2mm as margin
  //         setViewPort(newViewPort);
  //       }
  //     }, 1000);

  //     setintervalIDPSD(animate);
  //   }
  // };

  // const stopAnimation = () => {
  //   setAnimationInProgress(false);
  //   clearInterval(intervalIDPSD);
  // };

  return (
    <>
      <div className="ml-5">
        {/* <div className="flex">
          <button onClick={startAnimation} disabled={animationInProgress}>
            Start Animation
          </button>
          <button onClick={stopAnimation} disabled={!animationInProgress}>
            Stop Animation
          </button>
        </div> */}

        <DynamicPsdHeatMap
          xDirection="rtl"
          showLegend={true}
          widgetSize={{ width: 200, height: 200 }}
          saturation={1}
          viewPort={viewPort}
          newSiteData={newSiteData}
          allSitesData={allSitesData}
        />
      </div>
    </>
  );
};

export default PSDComponent;
