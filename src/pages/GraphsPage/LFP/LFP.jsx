import { useEffect, useRef, useState } from "react";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";

const LFP = ({ isAnimating, title, jsonSource, electrodeNumber }) => {
  const options = {
    title: `${title}`,
    backgroundColor: "rgba(26, 26, 19, 0.92)",
    color: "black",
    width: 280,
    height: 260,
    legend: {
      show: false,
    },
    cursor: {
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
        stroke: electrodeNumber === 0 ? "blue" : "red",
      },
    ],
  };

  const chartRef = useRef(null);
  const [DataMat, setDataMat] = useState(null); // [x, y]

  useEffect(() => {
    fetch("./output3.json").then((response) => {
      response.json().then((xAxis) => {
        let data = [];
        data.push(xAxis);
        fetch(`./${jsonSource}`)
          .then((response) => response.json())
          .then((jsonData) => {
            data.push(jsonData[electrodeNumber]);
            setDataMat(data);
          });
      });
    });
  }, []);

  return <h1>LFP</h1>;
};

export default LFP;

/*

import { useEffect, useRef, useState } from "react";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";

const RealTimeGraph = ({ isAnimating, title, jsonSource, electrodeNumber }) => {
  const options = {
    title: `${title}`,
    backgroundColor: "rgba(26, 26, 19, 0.92)",
    color: "black",
    width: 280,
    height: 260,
    legend: {
      show: false,
    },
    cursor: {
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
        stroke: electrodeNumber === 0 ? "blue" : "red",
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
    if (chartRef.current === null) return;
    if (DataMat === null) return;
    let temp = [...chartRef.current.data];
    if (nullStart + nullCount > temp[1].length) {
      nullStart = 0;
      nullEnd = 2_200 * 4;
    }
    for (let i = nullEnd; i < temp[1].length && i < nullEnd + nullCount; i++) {
      temp[1][i] = null;
    }
    for (let i = nullStart; i < nullStart + nullCount; i++) {
      temp[1][i] = DataMat[1][i];
    }

    nullStart = nullStart + nullCount;
    nullEnd = nullEnd + nullCount;
    chartRef.current.setData(temp);
  };

  useEffect(() => {
    fetch("./xAxis.json").then((response) => {
      response.json().then((xAxis) => {
        let data = [];
        data.push(xAxis);
        // fetch the data from json file
        fetch(`./${jsonSource}`)
          .then((response) => response.json())
          .then((jsonData) => {
            // console.log("electrode ", electrodeNumber);
            data.push(jsonData[electrodeNumber]);
            setDataMat(data);
          });
      });
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
      UpdateChart();
    }, 10);
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


*/
