module.exports = server => {
    const test = require("../controllers/test.controller.js");
    const urlencodedParser = require("express").urlencoded({extended: false});

    const router = require("express").Router();

    router.get("/test", test.getTest);

    router.get("/thanks", test.getThanks);

    router.post("/test", urlencodedParser, test.postTest);

    server.use(router);
};