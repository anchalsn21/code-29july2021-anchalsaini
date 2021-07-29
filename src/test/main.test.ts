process.env.NODE_ENV = "test";
import { fetchAllData } from "../database/mock_db";
import request from "supertest";
import {
  updateBmiData,
  getAllBmiDetailsService,
  getCategoryCount,
} from "../services/bmi.services";
import {
  calculateBmi,
  getHealthRiskByCategory,
  getCategoryByBmi,
} from "../utils/calculate";
import { app } from "../../app";

let data = fetchAllData();

describe("Bmi services testing", () => {
  it("Get overweight count success", async () => {
    let query = "Overweight";
    let result = getCategoryCount(query);
    expect(result).toEqual(1);
  });

  it("Overweight count should fail", async () => {
    let query = "Overweight";
    let result = getCategoryCount(query);
    expect(result).not.toEqual(2);
  });

  it("Get get All Bmi Details ", async () => {
    let result = fetchAllData();
    expect(result[0].bmi).toEqual(32.83);
  });

  it("Successfully Checks the working of updateBmiData functions ", async () => {
    let result = updateBmiData(data);
    expect(result[0].bmi).toEqual(32.83);
  });

  it("Successfully Checks the working of updateBmiData functions ", async () => {
    let result = updateBmiData(data);
    expect(result[0].bmi).not.toEqual(25.83);
  });
});

describe("Calculate Function testing", () => {
  it("Successfully calculatest the  BMI", async () => {
    let result = calculateBmi(96, 171);
    expect(result).toEqual(32.83);
  });

  it("Successfully gets the category by BMI", async () => {
    let result = getCategoryByBmi(32.83);
    expect(result).toEqual("Moderately Obese");
  });

  it("Successfully gets the healthRiskBy Category", async () => {
    let result = getHealthRiskByCategory("Moderately Obese");
    expect(result).toEqual("Medium Risk");
  });
});

/**
 * @description - Unit testing of Api's
 */

it("Gets all bmi data", async () => {
  const response = await request(app)
    .get("/bmi")
    .set("Accept", "application/json")
    .send()
    .expect(200);

  expect(response.body.totalRecords).toEqual(6);
});

it("Checks if Api returns paginated data", async () => {
  const response = await request(app)
    .get("/bmi")
    .set("Accept", "application/json")
    .send()
    .expect(200);

  expect(response.body.data.length).toEqual(5);
});

it("Checks if Api returns empty data", async () => {
  const response = await request(app)
    .get("/bmi?page=10")
    .set("Accept", "application/json")
    .send()
    .expect(400);
});

it("Checks if Overweight Count is returned correctly", async () => {
  const response = await request(app)
    .get("/bmi/overweight")
    .set("Accept", "application/json")
    .send()
    .expect(200);

  expect(response.body.count).toEqual(1);
});

it("Checks if Moderately Obese Count is returned correctly", async () => {
  const response = await request(app)
    .get("/bmi/Moderately%20Obese")
    .set("Accept", "application/json")
    .send()
    .expect(200);

  expect(response.body.count).toEqual(3);
});

it("Returns error if No category is found", async () => {
  const response = await request(app)
    .get("/bmi/none")
    .set("Accept", "application/json")
    .send()
    .expect(400);
});
