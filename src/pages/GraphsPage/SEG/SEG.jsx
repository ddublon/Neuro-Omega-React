import { useEffect, useRef, useState } from "react";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";
import { Switch } from "antd";
import { CustomDataStructure } from "./CustomDataStructure";

const SEG = ({ isAnimating, title, jsonSource, electrodeNumber }) => {
  const [isMultiColor, setIsMultiColor] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("./SPK/SPKxAxis.json");
      let xAxis = await response.json();

      // Initialize your custom data structure with xValues
      let data = new CustomDataStructure(xAxis);

      // Load the first yValue outside the while loop to make the graph visible immediately
      let initialResponse = await fetch(`./SPK/output1.json`);
      let initialJsonData = await initialResponse.json();
      data.push(initialJsonData);
      setDataMat(data.getAll());

      let i = 2;
      while (isAnimating) {
        response = await fetch(`./SPK/output${i}.json`);
        let jsonData = await response.json();

        // Push yValues into your custom data structure
        data.push(jsonData);

        // Use setTimeout to create a delay of 30 milliseconds
        await new Promise((resolve) => setTimeout(resolve, 30));

        // Set the state with all arrays in the custom data structure
        setDataMat(data.getAll());

        // Reset i to 1 if it reaches 30, else increment
        i = (i % 30) + 1;
      }
    };

    fetchData();
  }, [isAnimating]);

  const chartRef = useRef(null);
  const [DataMat, setDataMat] = useState(null);

  // Define an array of colors for your lines
  const colors = [
    "red",
    "blue",
    "green",
    "purple",
    "orange",
    "black",
    "grey",
    "pink",
    "yellow",
    "brown",
    "cyan",
    "magenta",
    "lime",
    "navy",
    "teal",
    "olive",
    "maroon",
    "salmon",
    "turquoise",
    "violet",
  ];

  let series = DataMat
    ? DataMat.map((_, index) =>
        index === 0
          ? {}
          : isMultiColor
          ? { stroke: colors[index % colors.length] }
          : { stroke: electrodeNumber === 0 ? "blue" : "red" }
      )
    : [];

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
    series: series,
  };

  const handleColorChange = (checked) => {
    setIsMultiColor(checked);
  };

  return (
    <div>
      <Switch checked={isMultiColor} onChange={handleColorChange} />
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
