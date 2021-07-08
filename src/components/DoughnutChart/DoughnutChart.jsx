import React, { useEffect, useCallback, useState } from "react";
import ChartComponent, { Bubble, Bar, Pie, PolarArea, Line, Scatter, Radar } from "react-chartjs-2";

const DoughnutChart = ({ name, ingredients }) => {
  const [data, setData] = useState({});
  const [colors, setColors] = useState([]);
  const [chartType, setChartType] = useState("doughnut");

  //random color generator 
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };
 //randomize for opacity 
  const changeOpacity = (color, opacity) => {
    const rgb = color.substring(0, color.lastIndexOf(","));
    return `${rgb}, ${opacity})`;
  };

  const populateColors = (num) => {
    const nextColors = [...colors];
    if (num < 0) {
      for (let i = 0; i > num; i--) {
        nextColors.pop();
      }
    } else if (num > 0) {
      for (let i = 0; i < num; i++) {
        nextColors.push(randomColor());
      }
    }

    setColors(nextColors);
    return nextColors;
  };

  useEffect(() => {
    const numIngredients = ingredients?.length ?? 0;
    const numColors = colors?.length ?? 0;
    const dataColors = populateColors(numIngredients - numColors);
    const mlPerOunce = 29.5735;
    const mlPerBarspoon = 5;
    const mlPerDash = 0.9;
 
    //logic to calculate ml
    
    setData({
      labels: ingredients?.map((ingredient) => ingredient.name),
      datasets: [
        {
          label: "# of milliliters",
          data: ingredients?.map((ingredient) => {
            switch (ingredient.measurement_type) {
              case "ounces":
                return Math.round(ingredient.quantity * mlPerOunce);
              case "barspoon":
                return ingredient.quantity * mlPerBarspoon;
              case "dash":
                return Math.round(ingredient.quantity * mlPerDash);
              default:
                return ingredient.quantity;
            }
          }),
          backgroundColor: dataColors,
          borderColor: dataColors.map((color) => changeOpacity(color, 1)),
          borderWidth: 1,
        },
      ],
    });
  }, [ingredients, chartType]);

  const getCurrentChart = () => {
    switch (chartType) {
      case "bubble":
        return <Bubble data={data} />;
      case "bar":
        return <Bar data={data} />;
        case "pie":
        return <Pie data={data} />;
        case "polarArea":
        return <PolarArea data={data} />;
        case "line":
        return <Line data={data} />;
        case "scatter":
        return <Scatter data={data} />;
        case "radar":
          return <Radar data={data} />;
        
        
    }
    return <ChartComponent data={data} type={chartType} />;
  };

  // 'line' | 'bar' | 'horizontalBar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter'
  return (
    <div style={{ width: 400, height: 500 }}>
      <div className="header">
        <h1 className="title">{name}</h1>
        <select
          value={chartType}
          onChange={(event) => setChartType(event.target.value)}
        >
          <option value="line">line</option>
          <option value="bar">bar</option>
          <option value="radar">radar</option>
          <option value="doughnut">doughnut</option>
          <option value="polarArea">polar area</option>
          <option value="bubble">bubble</option>
          <option value="pie">pie</option>
          <option value="scatter">scatter</option>
        </select>
      </div>

      {getCurrentChart()}
    </div>
  );
};

export default DoughnutChart;
