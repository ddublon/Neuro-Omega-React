import React, { useEffect, useState } from "react";

const Counter = ({ startCounting }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (startCounting && count < 5) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    } else if ((!startCounting && count !== 0) || count === 5) {
      clearInterval(interval);
      setCount(0); // Resets the count
    }
    return () => clearInterval(interval);
  }, [startCounting, count]);

  return <h1>{count}</h1>;
};

export default Counter;
