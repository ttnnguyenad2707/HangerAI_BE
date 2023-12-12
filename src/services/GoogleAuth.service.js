import Account from '../models/Account.model.js'
import TokenService from './Token.service.js';


const GoogleAuthService = {
    registerWithGoogle: async (oauthUser) => {
        const isUserExists = await Account.findOne({
            email: oauthUser.emails[0].value,
        });
        let dataOutput;
        let genAccessToken, genRefreshToken;
        if (isUserExists) {

            genAccessToken = await TokenService.genAccessToken(isUserExists._doc);
            genRefreshToken = await TokenService.genRefreshToken(isUserExists._doc);
            isUserExists.refreshToken = genRefreshToken;
            if (isUserExists.avatar === null) {
                isUserExists.avatar = oauthUser.photos[0].value;
            }

            await isUserExists.save();

            const { password, refreshToken, ...others } = isUserExists._doc;
            dataOutput = { message: "Login successfully", data: others };
        }
        else {

            const account = new Account({
                name: oauthUser.displayName,
                provider: oauthUser.provider,
                email: oauthUser.emails[0].value, //optional - storing it as extra info
                avatar: oauthUser.photos[0].value, //optional
            });
            genAccessToken = await TokenService.genAccessToken(account._doc);
            genRefreshToken = await TokenService.genRefreshToken(account._doc);
            account.account = genRefreshToken;
            await account.save();
            dataOutput = {
                message: 'User Registered.',
                data: account._doc
            };
        }
        return { dataOutput, genAccessToken }

    },
}

export default GoogleAuthService