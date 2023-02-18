import { Router } from "express";
import mo1Data from "../data/mo-all-1.json" assert { type: "json" };
import mo2Data from "../data/mo-all-2.json" assert { type: "json" };
import mo3Data from "../data/mo-all-3.json" assert { type: "json" };
import mo4Data from "../data/mo-all-4.json" assert { type: "json" };

const moData = [
  ...mo1Data.data,
  ...mo2Data.data,
  ...mo3Data.data,
  ...mo4Data.data,
];

const moRouter = new Router();

moRouter.get(
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
    data.data = moData.slice(
      pageIndex * pageSize - pageSize,
      pageIndex * pageSize
    );

    const currentPage = pageIndex;
    const hasNextPage = moData.length > pageIndex * pageSize;
    const totalPage = Math.ceil(moData.length / pageSize);

    data.pageSize = pageSize;
    data.currentPage = currentPage;
    data.hasNextPage = hasNextPage;
    data.totalPage = totalPage;
    data.records = data.data.length;

    return res.status(200).send(data);
  }
);

export default moRouter;
