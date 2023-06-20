import { useEffect, useRef, useState } from "react";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";

const SEG = ({ isAnimating, title, jsonSource, electrodeNumber }) => {
  const options = {
    title: `SEG`,
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

  const chartRef = useRef(null);
  const [DataMat, setDataMat] = useState(null); // [x, y]

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

export default SEG;
