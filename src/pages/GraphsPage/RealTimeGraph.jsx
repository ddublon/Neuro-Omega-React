import React, { useEffect, useRef, useState } from "react";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";

const RealTimeGraph = ({ isAnimating, title }) => {
  const options = {
    title: `${title} 44khz`,
    width: 280,
    height: 260,
    legend: {
      show: false,
    },
    cursor:{
      show: false,
    },
    
    scales: {
      x: {
        time: false,
      },
      y: {},
    },
    axes: [{}],
    series: [
      {},
      {
        stroke: "blue",
      },
    ],
  };
  let nullStart = 0;
  let nullEnd = 2_200 * 5;
  let nullCount = 2_200 * 5;
  let stopIntervalFunctionPtr = useRef(null);

  const chartRef = useRef(null);
  const [DataMat, setDataMat] = useState(null); // [x, y]

  const UpdateChart = () => {
    // let temp = [... chartRef.current.data];
    let temp = [...chartRef.current.data];
    if (nullStart + nullCount > temp[1].length) {
      nullStart = 0;
      nullEnd = 2_200 * 4;
    }
    // use nullStart nullEnd nullCount to update the data
    for (let i = nullEnd; i < temp[1].length && i < nullEnd + nullCount; i++) {
      temp[1][i] = null;
    }
    for (let i = nullStart; i < nullStart + nullCount; i++) {
      temp[1][i] = DataMat[1][i];
    }
    // update the nullStart nullEnd nullCount
    nullStart = nullStart + nullCount;
    nullEnd = nullEnd + nullCount;
    chartRef.current.setData(temp);
  };

  useEffect(() => {
    // fetch the data from ./DataMat.json
    fetch("./DataMat.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setDataMat(jsonData);
      });
  }, []);

  useEffect(() => {
    if (isAnimating) {
      stopIntervalFunctionPtr.current = startAnimation();
    } else {
      if (stopIntervalFunctionPtr.current) {
        stopIntervalFunctionPtr.current();
      }
    }
  }, [isAnimating]);

  const startAnimation = () => {
    // set interval for every 1 second to update the data using UpdateChart function
    const interval = setInterval(() => {
      // console.time("UpdateChart");
      UpdateChart();
      // console.timeEnd("UpdateChart");
    }, 100);
    return () => clearInterval(interval);
  };

  return (
    <div>
      {
        // if DataMat is not null then show UplotReact
        DataMat && (
          <UplotReact
            options={options}
            data={DataMat}
            onCreate={(chart) => {
              chartRef.current = chart;
              // console.log(chartRef.current);
            }}
            onDelete={(chart) => {}}
            key={Math.random()}
          />
        )
      }
    </div>
  );
};

export default RealTimeGraph;
