import Account from '../models/Account.model.js'


class AccountService {
    async getProfile(req, res) {
        try {
            const { accountId } = req.params;
            const profile = await Account.findById(accountId);
            if (!profile) {
                return res.send("Account not found !!");
            }

            const { password, _id, refreshToken, passwordResetCode, ...other } = profile._doc
            return res.status(200).json({
                data: other
            })

        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async updateProfile(req, res) {
        try {
            const { accountId } = req.params;
            const account = await Account.findById(accountId);
            if (!account) {
                return res.send("Account not found !!");
            }

            const { name, phone, avatar } = req.body;
            await Account.findByIdAndUpdate(accountId, { name, phone, avatar })

            Account.findById(accountId).then(data => {
                const { password, _id, refreshToken, passwordResetCode, ...other } = data._doc
                return res.status(200).json({
                    message: "Update Successfully",
                    data: other
                })
            });

        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }


}

export default new AccountService();
