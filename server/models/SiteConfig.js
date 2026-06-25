const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  siteName: { type: String, default: 'ASPIRANTS.SHOP' },
  logo: String,
  favicon: String,
  upiId: String,
  phoneNumber: String,
  email: String,
  address: String,
  socialLinks: {
    whatsapp: String,
    instagram: String,
    facebook: String,
    twitter: String
  },
  maintenanceMode: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
