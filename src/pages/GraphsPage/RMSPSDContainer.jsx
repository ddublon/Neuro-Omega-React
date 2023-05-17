import React, { useState } from "react";
import BarChartComponent from "./NRMS/BarChartComponent";
import PSDComponent from "./PSD/PSDComponent";

const RMSPSDContainer = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  // RMS related code
  const [siteDepthArray, setSiteDepthArray] = useState([]);
  const [rmsData, setRmsData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);
  const [currentDepth, setCurrentDepth] = useState(5);

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
  // RMS related code ends

  // PSD related code
  const createInitialAllSitesData = () => {
    const numberOfSites = 25;

    const generateRandomData = (length) =>
      Array.from({ length }, () => (Math.random() * 4 - 4).toFixed(5));

    const generateRandomDataForSites = (numberOfSites, dataLength) =>
      Array.from({ length: numberOfSites }, () =>
        generateRandomData(dataLength)
      );

    return {
      siteDepth: Array.from({ length: numberOfSites }, (_, i) => 10 - i * 0.4),
      stride: 0.3,
      startFreq: 3,
      psd: [].concat(...generateRandomDataForSites(numberOfSites, 100)),
    };
  };
  const getNewSiteData = (depth) => {
    const numberOfSites = 25;
    const generateRandomData = (length) =>
      Array.from({ length }, () => (Math.random() * 4 - 4).toFixed(5));

    return {
      depth,
      stride: 0.3,
      startFreq: 3,
      psd: [].concat(...generateRandomData(100)),
    };
  };

  const [intervalIDPSD, setintervalIDPSD] = useState(null);
  const [allSitesData, setAllSitesData] = useState({
    // ...initialAllSitesData,
    siteDepth: [],
    stride: 0.3333333333,
    startFreq: 3,
    psd: [],
  });

  const [newSiteData, setNewSiteData] = useState(null);

  const [viewPort, setViewPort] = useState({
    freqRange: [3, 12],
    depthRange: [10, -1],
  });

  const [animationInProgress, setAnimationInProgress] = useState(false);

  let depth = 10;
  const startAnimation = () => {
    if (!animationInProgress) {
      setAnimationInProgress(true);

      const animate = setInterval(() => {
        // setAllSitesData(() => ({ ...initialAllSitesData }));
        const newData = getNewSiteData(depth);
        // console.log("TCL: animate -> newData", newData);
        depth -= 0.2;
        setNewSiteData(newData);

        // drive deeper than plan, need to adjust the viewport
        if (depth < viewPort.depthRange[1]) {
          const newViewPort = { ...viewPort };
          newViewPort.depthRange[1] -= 2; // reserve 2mm as margin
          setViewPort(newViewPort);
        }
      }, 1000);

      setintervalIDPSD(animate);
    }
  };

  const stopAnimation = () => {
    setAnimationInProgress(false);
    clearInterval(intervalIDPSD);
  };

  // PSD related code ends

  return (
    <div>
      <button
        onClick={() => {
          setIsAnimating(!isAnimating);
          setShouldUpdate(!shouldUpdate);
          if (shouldUpdate) {
            generateData();
            startAnimation();
          } else {
            clearTimeout(timeoutId);
            stopAnimation();
          }
        }}
      >
        {isAnimating ? "stop" : "start"}
      </button>
      <div className="flex">
        <BarChartComponent
          isAnimating={isAnimating}
          siteDepthArray={siteDepthArray}
          setSiteDepthArray={setSiteDepthArray}
          rmsData={rmsData}
          setRmsData={setRmsData}
          shouldUpdate={shouldUpdate}
          setShouldUpdate={setShouldUpdate}
          timeoutId={timeoutId}
          setTimeoutId={setTimeoutId}
          currentDepth={currentDepth}
          setCurrentDepth={setCurrentDepth}
          startRmsAnimation={startRmsAnimation}
        />
        <PSDComponent
          isAnimating={isAnimating}
          initialAllSitesData={createInitialAllSitesData()}
          intervalIDPSD={intervalIDPSD}
          setintervalIDPSD={setintervalIDPSD}
          allSitesData={allSitesData}
          setAllSitesData={setAllSitesData}
          newSiteData={newSiteData}
          setNewSiteData={setNewSiteData}
          viewPort={viewPort}
          setViewPort={setViewPort}
          animationInProgress={animationInProgress}
          setAnimationInProgress={setAnimationInProgress}
          depth={depth}
        />
      </div>
    </div>
  );
};

export default RMSPSDContainer;
