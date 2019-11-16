module.exports = (app) => {
    app.use('/users', require('./users'));
    app.use('/login', require('./login'));
    app.use('/orders', require('./orders'));
}