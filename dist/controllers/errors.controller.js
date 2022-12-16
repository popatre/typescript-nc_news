"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.psqlErrors = exports.errors400 = exports.notValidRoute = void 0;
const notValidRoute = (req, res) => {
    res.status(404).send({ msg: "Route not found" });
};
exports.notValidRoute = notValidRoute;
const errors400 = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
exports.errors400 = errors400;
const psqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
    }
    if (err.code === "23503") {
        res.status(404).send({ msg: "Article not found" });
    }
    else {
        next(err);
    }
};
exports.psqlErrors = psqlErrors;
