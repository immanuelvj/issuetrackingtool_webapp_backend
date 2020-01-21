const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const passport = require('passport')
const auth = require('../middlewares/auth')
module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    app.post(`${baseUrl}/login`, userController.loginFunction);

    app.post(`${baseUrl}/sociallogin`,userController.socialLogin);

    app.post(`${baseUrl}/logout`,userController.logout);
    
    app.get(`${baseUrl}/logoutgoogle`,userController.logoutgoogle);

    app.get(`${baseUrl}/view/all`,  userController.getAllUser);

    app.get(`${baseUrl}/:userId/view`, userController.getSingleUser);

    app.get(`/auth/google`, passport.authenticate('google',{
        scope: ['profile', 'email']
    }))

    app.get(`/auth/google/callback` ,passport.authenticate('google'),(req, res)=>{
        let responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
         responseHTML = responseHTML.replace('%value%', JSON.stringify({
        user: req.user
    }));
    res.status(200).send(responseHTML);
    })
}
