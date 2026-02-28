import React from 'react';

const SliderLoader = () => {


  const colorCodes = localStorage.getItem("color_theme");
  let parsedColorCodes = JSON.parse(colorCodes);


  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto', width: "100vw", maxHeight: "75vh", padding: "100px", minHeight: "25vh" }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" r="32" strokeWidth="6" stroke={parsedColorCodes?.color ? parsedColorCodes?.color : '#000'} strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
      </circle>
    </svg>
  );
}


export default SliderLoader;

