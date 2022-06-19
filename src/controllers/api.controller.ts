import express from "express";
import endpoints = require("../endpoints.json");

export const getAllEndpoints: express.RequestHandler<{}, { routes: {} }> = (
    req,
    res
) => {
    res.status(200).send({ routes: endpoints });
};
