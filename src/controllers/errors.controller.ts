import express from "express";
import { NextFunction } from "express";

export const notValidRoute: express.RequestHandler<{}, { msg: string }> = (
    req,
    res
) => {
    res.status(404).send({ msg: "Route not found" });
};

export const errors400: express.ErrorRequestHandler<{}, { msg: string }> = (
    err,
    req,
    res,
    next: NextFunction
) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};
