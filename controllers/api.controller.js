const json = require("../endpoints.json");

exports.endspointsJson = async (req, res, next) => {
    res.status(200).send(json);
};
