const v1Router = require('express').Router();
const authRouter = require('./auth/authRouter');
const contentRouter=require("./content/genrate");
v1Router.use('/auth', authRouter);
v1Router.use('/content',contentRouter);

module.exports = v1Router;