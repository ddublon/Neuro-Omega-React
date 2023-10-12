import { useEffect, useRef, useState } from "react";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";
import getOptions from "./chartOptions";

const NULL_COUNT = 2_650;
const INTERVAL_DURATION = 50;

const RealTimeGraph = ({ isAnimating, title, jsonSource, electrodeNumber }) => {
  const chartRef = useRef(null);
  const [intervalID, setIntervalID] = useState(null);
  const [DataMat, setDataMat] = useState(null);

  const nullPositions = useRef({
    start: 0,
    end: NULL_COUNT,
  });

  const fetchData = async () => {
    const xAxisResponse = await fetch("./xAxis.json");
    const xAxis = await xAxisResponse.json();

    //console.log("xAxis", xAxis);

    const dataResponse = await fetch(`./${jsonSource}`);
    const jsonData = await dataResponse.json();
    //console.log("jsonData", jsonData);

    setDataMat([xAxis, jsonData[electrodeNumber]]);
  };

  const updateChart = () => {
    if (chartRef.current === null || DataMat === null) return;

    let tempData = [...chartRef.current.data];

    if (nullPositions.current.end >= tempData[1].length) {
      nullPositions.current.start = 0;
      nullPositions.current.end = NULL_COUNT;
    }

    for (
      let i = nullPositions.current.end;
      i < tempData[1].length && i < nullPositions.current.end + NULL_COUNT;
      i++
    ) {
      tempData[1][i] = null;
    }
    for (
      let i = nullPositions.current.start;
      i < nullPositions.current.start + NULL_COUNT;
      i++
    ) {
      tempData[1][i] = DataMat[1][i];
    }

    nullPositions.current.start += NULL_COUNT;
    nullPositions.current.end += NULL_COUNT;

    chartRef.current.setData(tempData);
  };

  const startAnimation = () => {
    const intervalIDtemp = setInterval(updateChart, INTERVAL_DURATION);
    setIntervalID(intervalIDtemp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      startAnimation();
    } else {
      clearInterval(intervalID);
    }
  }, [isAnimating]);

  const options = getOptions(title, electrodeNumber);

  return (
    <div>
      {DataMat && (
        <UplotReact
          options={options}
          data={DataMat}
          onCreate={(chart) => {
            chartRef.current = chart;
          }}
          key={Math.random()}
        />
      )}
    </div>
  );
};

export default RealTimeGraph;
