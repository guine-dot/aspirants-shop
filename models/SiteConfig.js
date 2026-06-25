import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'ASPIRANTS.SHOP'
  },
  tagline: String,
  logo: String,
  favicon: String,
  paymentQRCode: String,
  upiId: String,
  defaultTheme: {
    type: String,
    default: 'light'
  },
  contactEmail: String,
  supportPhone: String,
  whatsappNumber: String,
  whatsappGroupLink: String,
  whatsappChannelLink: String,
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String
  },
  emailConfig: {
    smtpHost: String,
    smtpPort: Number,
    smtpUser: String,
    smtpPassword: String
  },
  currency: {
    type: String,
    default: 'INR'
  },
  taxRate: {
    type: Number,
    default: 0
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maintenanceMessage: String,
  termsAndConditions: String,
  privacyPolicy: String,
  customCSS: String,
  customJavaScript: String,
  footerStyling: {
    backgroundColor: String,
    textColor: String,
    content: String
  },
  announcements: [{
    text: String,
    backgroundColor: String,
    textColor: String,
    isActive: Boolean,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SiteConfig', siteConfigSchema);
