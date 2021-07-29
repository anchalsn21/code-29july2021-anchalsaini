import { fetchAllData } from "../database/mock_db";
import {
  calculateBmi,
  getHealthRiskByCategory,
  getCategoryByBmi,
} from "../utils/calculate";
import { Tuser } from "../types/types";

/**
 * @description - This function is used for Updating the user object and add bmi , category and health risk category in the user object
 */

const setDataToObject = (obj: Tuser): Tuser => {
  let bmi = calculateBmi(obj.WeightKg, obj.HeightCm);
  let category = getCategoryByBmi(bmi);
  let healthRisk = getHealthRiskByCategory(category);
  obj.bmi = bmi;
  obj.category = category;
  obj.healthRisk = healthRisk;
  return obj;
};

/**
 * @description - This function is used for looping through the user data and calling the setDataToObject function on user Object
 */

const updateBmiData = (allData: Tuser[]): Tuser[] => {
  for (let user of allData) {
    setDataToObject(user);
  }

  return allData;
};

/**
 * @description - This function returns the Bmi data in paginated manner
 */

const getAllBmiDetailsService = (page: number) => {
  // @TODO -- Implement Pagination for large Data set
  // Currently Implemented using the Array Methods can be done using database query
  let currentPage: number = page;
  let limit: number = 5;
  let skip: number = limit * (currentPage - 1);
  let userData: Tuser[] = fetchAllData();
  let totalRecords = userData.length;
  let slicedData: Tuser[] = userData.slice(skip, skip + limit);
  let data: Tuser[] = updateBmiData(slicedData);
  return {
    totalRecords,
    data,
    currentPage,
  };
};

/**
 * @description - This function is for getting count of people belonging to a specific category
 */

const getCategoryCount = (searchCriteria: string) => {
  let userData: Tuser[] = fetchAllData();
  let updatedUserData: Tuser[] = updateBmiData(userData);
  let count: number = 0;
  updatedUserData.forEach((user: Tuser) => {
    if (user.category?.toLowerCase() == searchCriteria.toLowerCase()) {
      count++;
    }
  });
  return count;
};

export { getAllBmiDetailsService, updateBmiData, getCategoryCount };
