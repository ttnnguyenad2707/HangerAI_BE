import Account from '../models/Account.model.js'
import bcrypt from 'bcrypt'
import ImageStoresModel from '../models/ImageStores.model.js';
import getCurrentUser from '../utils/getCurrentUser.js';


class AccountService {
    async getProfile(req, res) {
        try {
            const accountId = getCurrentUser(req);
            const profile = await Account.findById(accountId);
            if (!profile) {
                return res.send("Account not found !!");
            }

            const { password, _id, refreshToken, passwordResetCode, imageStores, ...other } = profile._doc
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
            const accountId = getCurrentUser(req);
            const account = await Account.findById(accountId);
            if (!account) {
                return res.send("Account not found !!");
            }

            const { name, phone, avatar } = req.body;
            await Account.findByIdAndUpdate(accountId, { name, phone, avatar })

            Account.findById(accountId).then(data => {
                const { password, _id, refreshToken, passwordResetCode, imageStores, ...other } = data._doc
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
    async changePassword(req, res) {
        try {
            const accountId = getCurrentUser(req);
            const { oldPassword, newPassword } = req.body;
            const account = await Account.findById(accountId);
            if (!account) {
                return res.send("Account not found !!");
            }
            else {
                const comparePassword = await bcrypt.compare(oldPassword, account.password)
                if (!comparePassword) {
                    return res.send("Old Password not corrects !!");
                }
                else {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(newPassword, salt);
                    account.password = hashedPassword;
                    await account.save();
                    return res.status(200).json({
                        message: "Change Password successfully !"
                    })
                }
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async uploadImage(req, res) {
        try {
            const currentUserId = getCurrentUser(req);
            const { url, description } = req.body;
            const account = await Account.findById(currentUserId).populate("imageStores");
            if (!account) {
                return res.send("Account not found !!");
            }
            else {

                const newImage = new ImageStoresModel({
                    accountId: currentUserId,
                    url, description,
                });
                await newImage.save();
                account.imageStores.push(newImage);
                await account.save();
                return res.status(200).json({ message: "Upload image successfully !!", data: newImage })
            }

        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    async getListImages(req, res) {
        try {
            const currentUserId = getCurrentUser(req);
            const page = Number(req.query.page) || 1;
            const quantity = Number(req.query.quantity) || 10;

            // const { page = 1, quantity = 10 } = req.query;


            const startIndex = (page - 1) * quantity;

            const images = await ImageStoresModel.find({
                accountId: currentUserId,
                deleted: false
            })
                .skip(startIndex)
                .limit(quantity)
                .exec();

            const totalImagesCount = await ImageStoresModel.countDocuments({ deleted: false });

            const nextPage = startIndex + quantity < totalImagesCount ? parseInt(page) + 1 : null;
            const prevPage = startIndex > 0 ? parseInt(page) - 1 : null;

            return res.status(200).json({
                images: images,
                currentPage: parseInt(page),
                countCurrentPage: images.length,
                countTotal: totalImagesCount,
                nextPage: nextPage,
                prevPage: prevPage
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteImages(req, res) {
        try {
            const { imageIds } = req.body;

            const deletedImages = await ImageStoresModel.find({ _id: { $in: imageIds }, deleted: true });

            if (deletedImages.length > 0) {
                return res.status(400).json({ message: "Some images have already been deleted" });
            }

            const result = await ImageStoresModel.updateMany(
                { _id: { $in: imageIds } },
                { $set: { deleted: true, deletedAt: Date.now() } }
            );

            if (result.modifiedCount > 0) {
                return res.status(200).json({ message: "Deleted " + result.modifiedCount + " images successfully" });
            } else {
                return res.status(404).json({ message: "Image not found !!" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


}

export default new AccountService();
