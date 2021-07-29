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

/**
 * @description - This function is used for calculating the BMI fron weight and Height Provided
 * @param weight
 * @param height
 */

const calculateBmi = (weight: number, height: number): number => {
  let heightInMetres = height / 100;
  return Number((weight / heightInMetres ** 2).toFixed(2));
};

/**
 *  @description - This returns the health risk category based on the category
 * @param category
 */

const getHealthRiskByCategory = (category: string): string => {
  return healthRiskByCategory[category];
};

/**
 * @description - This function returns the category by taking the BMI as input
 * @param bmi
 */

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

/**
 * @description - This function is used to find the category name by the query text. If not found returns null
 * @param query
 */
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
