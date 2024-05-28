const Token = require('../models/Token');
const qrCode = require('qrcode');

const generateTokens = async (req, res) => {
    try {
      const { name, slot, count } = req.body;
  
      const existingTokens = await Token.find({ slot });
      if (existingTokens.length > 0) {
        return res.status(400).json({ error: 'Slot is already booked' });
      }
  
      const tokens = [];
  
      for (let i = 0; i < count; i++) {
        const tokenValue = generateUniqueToken();
        const qrCodeData = await qrCode.toDataURL(tokenValue);
  
        const token = new Token({
          value: tokenValue,
          qrCode: qrCodeData,
          name,
          slot,
        });
  
        await token.save();
        tokens.push({ value: tokenValue, qrCode: qrCodeData });
      }
  
      res.status(200).json({ tokens });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    const foundToken = await Token.findOne({ value: token });

    if (foundToken) {
      res.status(200).json({
        valid: true,
        name: foundToken.name,
        slot: foundToken.slot,
      });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateUniqueToken = () => {
  return Math.random().toString(36).substring(2, 10);
};

module.exports = {
  generateTokens,
  verifyToken,
};