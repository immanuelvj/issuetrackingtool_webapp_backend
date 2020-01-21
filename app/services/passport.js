
const token = require('../libs/tokenLib')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const mongoose = require('mongoose')
const time = require('./../libs/timeLib');


const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID: '951689382043-h5qvb3jpmf2c3fbn0nadsh5ogl67nunk.apps.googleusercontent.com',
    clientSecret: 'vjUmYtRLL0---IusLgIiOEWr',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    for (let x of profile.emails) {
        var email = x.value
    }
    const existingUser = await UserModel.findOne({ userId: profile.id })

    if (existingUser) {
        done(null, existingUser)
    } else {
        let newUser = await new UserModel({
            userId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: email,
            createdOn: time.now()
        })

        newUser.save()
       let token= token.generateToken(newUser,(err,tokenDetails)=>{
            tokenDetails.userId = newUser.userId
            tokenDetails.userDetails = newUser
            return tokenDetails;
        })
        const existingUser = await AuthModel.findOne({userId:profile.id})
        if(existingUser){
            done(null,existingUser)
        }
        else{
            let newAuthToken = new AuthModel({
                userId: token.userId,
                authToken: token.token,
                tokenSecret: token.tokenSecret,
                tokenGenerationTime: time.now()
            })
            newAuthToken.save()
        }
        
        done(null,newUser)


        

    }

})

);