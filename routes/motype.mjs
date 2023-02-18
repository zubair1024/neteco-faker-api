import { Router } from "express";
import moTypesRawData from "../data/mo-types.json" assert { type: "json" };

const moTypesData = [...moTypesRawData.data];

const moTypeRouter = new Router();

moTypeRouter.get(
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
    data.data = moTypesData.slice(
      pageIndex * pageSize - pageSize,
      pageIndex * pageSize
    );

    const currentPage = pageIndex;
    const hasNextPage = moTypesData.length > pageIndex * pageSize;
    const totalPage = Math.ceil(moTypesData.length / pageSize);

    data.pageSize = pageSize;
    data.currentPage = currentPage;
    data.hasNextPage = hasNextPage;
    data.totalPage = totalPage;
    data.records = data.data.length;

    return res.status(200).send(data);
  }
);

export default moTypeRouter;
