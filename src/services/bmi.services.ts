import { fetchAllData } from "../database/mock_db";
import {
  calculateBmi,
  getHealthRiskByCategory,
  getCategoryByBmi,
} from "../utils/calculate";
import { Tuser } from "../types/types";

const setDataToObject = (obj: Tuser): Tuser => {
  let bmi = calculateBmi(obj.WeightKg, obj.HeightCm);
  let category = getCategoryByBmi(bmi);
  let healthRisk = getHealthRiskByCategory(category);
  obj.bmi = bmi;
  obj.category = category;
  obj.healthRisk = healthRisk;
  return obj;
};

const updateBmiData = (allData: Tuser[]) => {
  for (let user of allData) {
    setDataToObject(user);
  }

  return allData;
};

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
