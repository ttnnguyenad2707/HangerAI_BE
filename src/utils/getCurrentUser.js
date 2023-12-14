import jwt from 'jsonwebtoken'
import env from '../../config/getEnv.js'
function getCurrentUser(req) {
    if (req.cookies && req.cookies.accessToken) {
        const accessToken = req.cookies.accessToken;
        const currentUser = jwt.verify(accessToken, env.ACCESS_KEY);
        return currentUser.id;
    } else {
        return { message: "Login to use this feature !! " };
    }
}

export default getCurrentUser