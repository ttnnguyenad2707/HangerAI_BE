import express from "express";
import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as dotenv from 'dotenv'
import GoogleAuthService from "../services/GoogleAuth.service.js";
dotenv.config();

const GoogleAuthRoute = express.Router();

let userProfile;
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            userProfile = profile;
            return done(null, userProfile);
        }
    )
);

GoogleAuthRoute.get("/", passport.authenticate('google', { scope: ['profile', 'email'] }))
GoogleAuthRoute.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/api/v1/auth/google/error' }),
    (req, res) => {
        res.redirect('/api/v1/auth/google/success'); // Successful authentication, redirect success.
    });

GoogleAuthRoute.get('/success', async (req, res) => {
    const { dataOutput, genAccessToken } = await GoogleAuthService.registerWithGoogle(userProfile);
    if (dataOutput) {
        console.log(genAccessToken)
        res.cookie("accessToken", genAccessToken, {
            httpOnly: false,
            secure: false,
            path: "/",
            sameSite: "strict",
        });
        return res.status(200).json(dataOutput);
    } else {
        return res.send("Error")
    }
});

GoogleAuthRoute.get('/error', (req, res) => res.send('Error logging in via Google..'));

export default GoogleAuthRoute