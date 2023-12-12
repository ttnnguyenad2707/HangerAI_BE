import asyncHandler from '../utils/async-handler.js';
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config();
const { ACCESS_KEY } = process.env;

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req?.authorization?.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        try {
            const user = jwt.verify(accessToken, ACCESS_KEY);
            req.user = user;
            next();
        } catch (err) {
            return res.status(403).json("Token is not valid");
        }
    } else {
        return res.status(401).json("You are not authenticated");
    }
});


function verifyTokenAdmin(req, res, next) {
    const url = req.url.toLowerCase().trim();
    const listUrlForAdmin = ["/admin"];
    const token = req.headers?.authorization?.split(" ")[1];
    // if ()
}

// const verifyTokenAdmin = asyncHandler(async (req, res, next) => {
//     await verifyToken(req, res, () => {
//         if (req.user.admin) {
//             next();
//         } else {
//             return res.status(403).json("You are not an Admin");
//         }
//     });

// });

export default verifyToken

