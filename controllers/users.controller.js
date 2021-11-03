const { fetchAllUsernames } = require("../models/users.model");

exports.getAllUsernames = (req, res, next) => {
    fetchAllUsernames()
        .then((usernames) => {
            res.status(200).send({ usernames });
        })
        .catch(next);
};
