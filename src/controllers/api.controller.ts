import express from "express";
import endpoints = require("../endpoints.json");

export const getAllEndpoints: express.RequestHandler<{}> = (req, res) => {
    // res.status(200).send({ routes: endpoints });

    res.render("index");
};
