import { useEffect, useState } from "react";

export const Board = () => {
  const [lights, setLights] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const handleSelect = (index) => {
    if (selectedBoxes.includes(index)) return;
    const newSelected = [...selectedBoxes, index];
    setSelectedBoxes(newSelected);
  };
  const initializeLights = () => {
    const newLights = Array(9).fill("");
    setLights(newLights);
  };
  const checkLights = () => {
    if (selectedBoxes.length === lights.length) {
      const timer = setInterval(() => {
        setSelectedBoxes((original) => {
          const newBoxes = [...original];
          newBoxes.pop();

          if (newBoxes.length === 0) {
            clearInterval(timer);
          }
          return newBoxes;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    initializeLights();
  }, []);

  useEffect(() => {
    checkLights();
  }, [selectedBoxes]);

  return (
    <div>
      <h1>Grid light</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          maxWidth: "300px",
          marginLeft: "23%",
        }}
      >
        {lights.map((_, index) => {
          return (
            <div
              style={{
                height: 100,
                width: 100,
                border: "1px solid black",
                margin: 5,
                backgroundColor: selectedBoxes.includes(index) ? "green" : "",
              }}
              onClick={() => handleSelect(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
