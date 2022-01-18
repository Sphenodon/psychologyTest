const admins = [
    { username: 'admin', password: '12345' },
    { username: 'admin2', password: 'qwerty' }
];

exports.getAdmin = function (request, response) {
    if (request.session.username == 'admin') {
        console.log(request.session.username + ' requested admin page');
        response.render('admin');
    } else {
        response.status(403).send('Access Denied!');
    }
}

exports.login = function (request, response){
    response.render("login",{

    });
}

exports.sign_in = function (request, response){
    let foundUser;
    // поиск пользователя в массиве users
    for (let i = 0; i < admins.length; i++) {
        let u = admins[i];
        if (u.username == request.body.username && u.password == request.body.password) {
            foundUser = u.username;
            break;
        }
    }
    if (foundUser !== undefined) {
        request.session.username = request.body.username;
        console.log("Login succeeded: ", request.session.username);
        response.send('Login successful: ' + 'sessionID: ' + request.session.id + '; user: ' + request.session.username);
    } else {
        console.log("Login failed: ", request.body.username);
        response.status(401).send('Login error');
    }
}

exports.logout = function (request, response){
    request.session.username = '';
    console.log('logged out');
    response.send('logged out!');
}