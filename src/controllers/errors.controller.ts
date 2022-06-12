import express from "express";

export const notValidRoute: express.RequestHandler<{}, { msg: string }> = (
    req,
    res
) => {
    res.status(404).send({ msg: "Route not found" });
};
