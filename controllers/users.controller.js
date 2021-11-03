const {
    fetchAllUsernames,
    fetchUsernameByName,
} = require("../models/users.model");

exports.getAllUsernames = (req, res, next) => {
    fetchAllUsernames()
        .then((usernames) => {
            res.status(200).send({ usernames });
        })
        .catch(next);
};

exports.getUsernameByName = (req, res, next) => {
    const { username } = req.params;
    fetchUsernameByName(username)
        .then((user) => {
            res.status(200).send({ user });
        })
        .catch(next);
};
