import { default as AccountModel } from '../models/Account.model.js';

const resetCredits = async () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  try {
    const result = await AccountModel.updateMany(
      { lastReset: { $lt: oneMonthAgo }, credit: { $ne: 0 } },
      { $set: { credit: 0, lastReset: new Date() } }
    );

    console.log(`Credits reset successfully for ${result.modifiedCount} accounts.`);
  } catch (error) {
    console.error('Error resetting credits:', error);
  }
};


export default resetCredits;
