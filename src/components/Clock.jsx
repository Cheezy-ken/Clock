import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  const clockSize = 256;
  const center = clockSize / 2;
  const radius = 100;

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="relative w-64 h-64 bg-blue-500 bg-opacity-30 backdrop-blur-md rounded-full border-3 shadow-[0_0_25px_10px_rgba(34,19,30,1)]">
        {Array.from({ length: 12 }, (_, i) => {
          const num = i + 1;
          const angle = ((num * 30 - 90) * Math.PI) / 180;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <div
              key={num}
              className="absolute text-black-500 font-bold"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {num}
            </div>
          );
        })}
        <div
          className="absolute bg-black"
          style={{
            left: "50%",
            bottom: "50%",
            width: "4px",
            height: "25%",
            transform: `translateX(-50%) rotate(${hourAngle}deg)`,
            transformOrigin: "bottom center",
            zIndex: 5,
          }}
        ></div>
        <div
          className="absolute bg-black"
          style={{
            left: "50%",
            bottom: "50%",
            width: "3px",
            height: "35%",
            transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
            transformOrigin: "bottom center",
            zIndex: 6,
          }}
        ></div>
        <div
          className="absolute bg-red-500"
          style={{
            left: "50%",
            bottom: "50%",
            width: "2px",
            height: "40%",
            transform: `translateX(-50%) rotate(${secondAngle}deg)`,
            transformOrigin: "bottom center",
            zIndex: 7,
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
      </div>
    </div>
  );
};

export default Clock;
