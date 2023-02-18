import { Router } from "express";

const loginRouter = new Router();

loginRouter.put(
  `/`,
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  (req, res) => {
    const { userid, value } = req.body;

    return res.status(200).json({
      apiKey: `${userid}_${value}`,
    });
  }
);

export default loginRouter;
