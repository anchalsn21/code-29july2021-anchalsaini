import { Tuser } from "../types/types";

const data: Tuser[] = [
  { Gender: "Male", HeightCm: 171, WeightKg: 96 },
  { Gender: "Male", HeightCm: 161, WeightKg: 85 },
  { Gender: "Male", HeightCm: 180, WeightKg: 77 },
  { Gender: "Female", HeightCm: 166, WeightKg: 62 },
  { Gender: "Female", HeightCm: 150, WeightKg: 70 },
  { Gender: "Female", HeightCm: 167, WeightKg: 82 },
];

/**
 * @description - This function is used to fetch all the User mock data and simulate the DB find query
 */

const fetchAllData = (): Tuser[] => {
  return data;
};

export { fetchAllData };
