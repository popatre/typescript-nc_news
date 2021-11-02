exports.notARoute = (req, res) => {
    res.status(404).send({ message: "invalid url" });
};

exports.errors400 = (err, req, res, next) => {
    //console.log(err.code, "<----PSQL CODE");
    if (err.status) {
        res.status(err.status).send({ message: err.msg });
    } else {
        next(err);
    }
};

exports.psqlErrors = (err, req, res, next) => {
    console.log(err.code, "<----PSQL CODE");
    if (err.code === "22P02") {
        res.status(400).send({ message: "invalid request" });
    } else {
        next(err);
    }
};
