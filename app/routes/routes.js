module.exports = app => {
    const testController = require("../controllers/test.controller.js");
    const authorizationController = require("../controllers/authorization.js");
    const urlencodedParser = require("express").urlencoded({extended: false});

    const router = require("express").Router();

    router.get("/test", testController.getTest);

    router.get("/thanks", testController.getThanks);

    router.post("/test", urlencodedParser, testController.postTest);

    router.get("/data", testController.getData);

    router.get("/admin", authorizationController.getAdmin);

    router.get("/login", authorizationController.login);

    router.post("/sign_in", authorizationController.sign_in);

    router.get("/logout", authorizationController.logout);

    app.use(router);
};