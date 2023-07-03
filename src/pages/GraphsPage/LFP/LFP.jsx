import { useEffect, useRef, useState } from "react";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";

const LFP = ({ isAnimating, title, jsonSource, electrodeNumber }) => {
  const options = {
    title: `LFP 1.375khz`,
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
  const [DataMat, setDataMat] = useState(null);
  let stopIntervalFunctionPtr = useRef(null);
  let nullStart = 0;
  let nullEnd = 100;
  let nullCount = 100;

  useEffect(() => {
    fetch("./output3.json").then((response) => {
      response.json().then((xAxis) => {
        let data = [];
        data.push(xAxis);
        fetch("./output2.json")
          .then((response) => response.json())
          .then((jsonData) => {
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
    const interval = setInterval(() => {
      UpdateChart();
    }, 10);
    return () => clearInterval(interval);
  };

  const UpdateChart = () => {
    if (chartRef.current === null) return;
    if (DataMat === null) return;
    let temp = [...chartRef.current.data];
    if (nullStart + nullCount > temp[1].length) {
      nullStart = 0;
      nullEnd = 100;
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

export default LFP;
