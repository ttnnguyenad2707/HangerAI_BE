import AccountModel from "../models/Account.model.js";
import getCurrentUser from "../utils/getCurrentUser.js"

class AITools {
    async useImageToText (req,res) {
        try {
            const accountId = getCurrentUser(req);
            const account = await AccountModel.findById(accountId);
            if (!account){
                return res.send("Account not found !!")
            }
            if (!account.admin) {
                if (account.credit <= 0) {
                    return res.send("Your credit is not enough, please buy more or upgrade account ... ");
                }
    
                let speedGenerate = 16;
                if (account.levelAccount === "Lite"){
                    speedGenerate = 16;
                    account.credit -=1;
                }
                else if (account.levelAccount === "Pro"){
                    speedGenerate = 8;
                    account.credit -=1;
                }
                else if (account.levelAccount === "Premium"){
                    speedGenerate = 4;
                    account.credit -=1;
                }
                await account.save();
                return res.status(200).json({
                    message: "Generate successfully >>",
                    speedGenerate,
                    isAdmin:false
                })
            }
            else {
                return res.status(200).json({
                    message: "Generate successfully",
                    isAdmin: true
                })
            }            
        } catch (error) {
            return res.status(500).json({message: error.message})        
        }
        
    }
}

export default new AITools