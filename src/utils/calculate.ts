import { Tuser } from "../types/types";

const healthRiskByCategory: { [category: string]: string } = {
  "Under Weight": "Malnutrition Risk",
  "Normal Weight": "Low Risk",
  Overweight: "Enhanced Risk",
  "Moderately Obese": "Medium Risk",
  "Severely Obese": "High Risk",
  "Very Severely Obese": "Very High Risk",
};

const categoryData = [
  { limit: 18.4, category: "Under Weight" },
  { limit: 24.9, category: "Normal Weight" },
  { limit: 29.9, category: "Overweight" },
  { limit: 34.9, category: "Moderately Obese" },
  { limit: 39.9, category: "Severely Obese" },
  { limit: +Infinity, category: "Very Severly Obese" },
];

const calculateBmi = (weight: number, height: number): number => {
  let heightInMetres = height / 100;
  return Number((weight / heightInMetres ** 2).toFixed(2));
};

const getHealthRiskByCategory = (category: string): string => {
  return healthRiskByCategory[category];
};

const getCategoryByBmi = (bmi: number): string => {
  let category: string = "None";
  for (let cat of categoryData) {
    if (bmi <= cat.limit) {
      category = cat.category;
      break;
    }
  }
  return category;
};

const getCategoryByName = (query: string): null | string => {
  let name = null;
  categoryData.forEach((cat) => {
    if (cat.category.toLowerCase() === query.toLowerCase()) {
      name = cat.category;
      return name;
    }
  });

  return name;
};

export {
  calculateBmi,
  getHealthRiskByCategory,
  getCategoryByBmi,
  getCategoryByName,
};
