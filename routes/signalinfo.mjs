import { Router } from "express";
import signalInfo1Data from "../data/signal-info-1.json" assert { type: "json" };
import signalInfo2Data from "../data/signal-info-2.json" assert { type: "json" };
import signalInfo3Data from "../data/signal-info-3.json" assert { type: "json" };

const signalInfoData = [
  ...signalInfo1Data.data,
  ...signalInfo2Data.data,
  ...signalInfo3Data.data,
];

const signalInfoRouter = new Router();

signalInfoRouter.get(
  `/`,
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  (req, res) => {
    const headerParams = JSON.parse(req.headers?.params);

    const { pageIndex, pageSize } = headerParams;

    const data = {
      data: [],
    };
    data.data = signalInfoData.slice(
      pageIndex * pageSize - pageSize,
      pageIndex * pageSize
    );

    const currentPage = pageIndex;
    const hasNextPage = signalInfoData.length > pageIndex * pageSize;
    const totalPage = Math.ceil(signalInfoData.length / pageSize);

    data.pageSize = pageSize;
    data.currentPage = currentPage;
    data.hasNextPage = hasNextPage;
    data.totalPage = totalPage;
    data.records = data.data.length;

    return res.status(200).send(data);
  }
);

export default signalInfoRouter;
