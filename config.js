require("dotenv").config();

function getSettings() {
  return {
    prices: {
      "7day": Number(process.env.KEY_PRICE_7DAY || 100),
      "15day": Number(process.env.KEY_PRICE_15DAY || 180),
      "30day": Number(process.env.KEY_PRICE_30DAY || 300),
    },
    referralBonus: Number(process.env.REFERRAL_BONUS || 10),
    minWithdraw: Number(process.env.MIN_WITHDRAW || 50),
    offer: {
      count: Number(process.env.OFFER_KEY_COUNT || 10),
      free: Number(process.env.OFFER_FREE_KEY || 2),
    },
  };
}

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  ADMIN_ID: process.env.ADMIN_TELEGRAM_ID,
  SETTINGS: getSettings,
};
