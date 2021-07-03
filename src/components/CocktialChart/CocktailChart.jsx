import React from "react";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import useParams from "react-router-dom"








const getIngredientVolume = (ingredient) => {
  if (ingredient.measurement_type === "ounces") {
    return ingredient.number;
  }
  if (ingredient.measurement_type === "dashes") {
    return ingredient.number * 0.1;
  }
};

const getVolume = (cocktail) => {
  const ingredientVolume = [];
  cocktail.ingredients.forEach((ingredient) => {
    ingredientVolume.push(getIngredientVolume(ingredient));
  });
  return ingredientVolume;
};

const getLabels = (cocktail) => {
  const ingredientLabels = [];
  cocktail.ingredients.forEach((ingredient) => {
    ingredientLabels.push(ingredient.name);
  });
  return ingredientLabels;
};

const getData = (cocktail) => {
  return {
    labels: getLabels(cocktail),
    datasets: [
      {
        label: "# of Votes",
        data: getVolume(cocktail),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const CocktailChart = (props) => (
  <>
    <div className="header">
      <h1 className="title">{props.cocktail.name}</h1>
    </div>
    <Doughnut data={getData(props.cocktail)} />
  </>
);

DoughnutChart.propTypes = {
    cocktail: PropTypes.node,
  };

  export default CocktailChart 