const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", ".hbs");

// создание хранилища для сессий
const sessionHandler = require('./app/models/session_handler');
const store = sessionHandler.createStore();

// регистрируем промежуточный обработчик, что бы парсить кукисы
app.use(cookieParser());
// создание сессии
app.use(session({
    store: store,
    secret: 'jW8aor76jpPX', // session secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 } // 2 days
}));

app.get("/", function (request, response) {
    response.render("main",{

    })
});

require("./app/routes/routes.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});