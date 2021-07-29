import { Request, Response } from "express";
import {
  getAllBmiDetailsService,
  getCategoryCount,
} from "../services/bmi.services";
import { appCreds } from "../config";
import { getCategoryByName } from "../utils/calculate";

const getAllBmiDetails = async (req: Request, res: Response) => {
  let page = Number(req.query.page) || 1;
  let { totalRecords, data, currentPage } = getAllBmiDetailsService(page);

  if (data.length === 0) {
    return res.status(400).send({
      message: `No data Found for page ${currentPage}`,
    });
  }

  return res.status(200).send({
    totalRecords,
    data,
    message: "All BMI data retreived successfully",
    viewMore: `${appCreds.baseUrl}/bmi?page=${currentPage + 1}`,
  });
};

const getCategoryCountData = async (req: Request, res: Response) => {
  let criteria: string = decodeURI(req.params.criteria) || "Overweight";
  let isCategoryExist: null | string = getCategoryByName(criteria);

  if (!isCategoryExist) {
    return res.status(400).send({ message: "Invalid search string" });
  }

  let count = getCategoryCount(criteria);
  return res
    .status(200)
    .send({ message: `${criteria} count retreived successfully`, count });
};

export { getAllBmiDetails, getCategoryCountData };
