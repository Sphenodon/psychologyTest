const express = require("express");

const server = express();

server.use(express.static("public"));
server.set("view engine", ".hbs");

server.get("/", function (request, response) {
    response.render("main",{

    })
});

require("./app/routes/routes.js")(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});