const getOptions = (title, electrodeNumber) => ({
  title: `${title}`,
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
});

export default getOptions;
