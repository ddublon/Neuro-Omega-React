import { useEffect, useRef, useState } from "react";
import { Switch } from "antd";
import { CustomDataStructure } from "./CustomDataStructure";
import { lightningChart, AxisScrollStrategies } from "@arction/lcjs"; // Import LightningChart JS

const SEG = ({ isAnimating, title, jsonSource, electrodeNumber }) => {
  const [isMultiColor, setIsMultiColor] = useState(true);
  const [DataMat, setDataMat] = useState(null);
  const chartRef = useRef(null);
  const seriesRef = useRef([]); // Keep track of line series

  const CONFIG = {
    timeDomain: 96,
    channels: 1,
    sampleRate: 44_000,
  };
  useEffect(() => {
    // Initialize a lightning chart XY chart
    const chart = lightningChart().ChartXY({ container: chartRef.current });
    const axisX = chart
      .getDefaultAxisX()
      .setScrollStrategy(AxisScrollStrategies.expansion)
      .setInterval({ start: 0, end: CONFIG.timeDomain })
      .setVisible(true);
    const axisY = chart
      .getDefaultAxisY()
      .setScrollStrategy(AxisScrollStrategies.expansion)
      .setVisible(true);

    const fetchData = async () => {
      let response = await fetch("./SPK/SPKxAxis.json");
      let xAxis = await response.json();

      // Initialize your custom data structure with xValues
      let data = new CustomDataStructure(xAxis);

      // Load the first yValue outside the while loop to make the graph visible immediately
      let initialResponse = await fetch(`./SPK/output1.json`);
      let initialJsonData = await initialResponse.json();
      data.push(initialJsonData);

      let i = 2;
      while (isAnimating) {
        response = await fetch(`./SPK/output${i}.json`);
        let jsonData = await response.json();

        // Push yValues into your custom data structure
        data.push(jsonData);

        // Use setTimeout to create a delay of 30 milliseconds
        await new Promise((resolve) => setTimeout(resolve, 30));

        const transformedData = data
          .getAll()
          .slice(1)
          .map((yData, idx) => {
            if (!seriesRef.current[idx]) {
              seriesRef.current[idx] = chart.addLineSeries({
                automaticColorIndex: i,
              });
            }
            const seriesData = xAxis.map((x, index) => ({
              x: x,
              y: yData[index],
            }));
            seriesRef.current[idx].add(seriesData);
          });
        axisY.fit();

        console.log("length ", seriesRef.current.length);

        // Check if seriesRef has more than 20 lines
        if (seriesRef.current.length === 20) {
          console.log(" length ", seriesRef.current.length);
          // Remove the oldest series from the chart
          seriesRef.current[0].dispose();

          // Remove the oldest series reference from the array
          seriesRef.current.shift();
        }

        // Reset i to 1 if it reaches 30, else increment
        i = (i % 30) + 1;
      }
    };

    fetchData();
    // log the chart component
    console.log("chart : ", chart);
    return () => chart.dispose();
  }, [isAnimating]);

  const handleColorChange = (checked) => {
    setIsMultiColor(checked);
  };

  return (
    <div>
      <Switch checked={isMultiColor} onChange={handleColorChange} />
      <div ref={chartRef} style={{ width: "580px", height: "460px" }}></div>
    </div>
  );
};

export default SEG;
