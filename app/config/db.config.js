module.exports = {
    MAX: 20,
    HOST: 'localhost',
    USER: 'postgres',
    DATABASE: 'psychologyTest',
    PASSWORD: '7465',
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};