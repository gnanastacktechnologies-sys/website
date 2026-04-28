import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: 'GnanaStack Technologies' },
    tagline: { type: String, default: 'From Village Vision to Digital Innovation' },
    heroBadge: { type: String, default: 'MERN Stack Software Studio' },
    heroTitle: { type: String, default: 'Building Powerful MERN Stack Products for Modern Businesses' },
    heroSubtitle: { type: String, default: 'GnanaStack Technologies builds HRMS platforms, online test portals, digital invitation websites, and custom MERN stack applications for businesses, institutions, and startups.' },
    primaryCTA: { type: String, default: 'Explore Products' },
    secondaryCTA: { type: String, default: 'Start Your Project' },
    aboutTitle: { type: String, default: 'From Village Vision to Digital Innovation' },
    aboutDescription: { type: String, default: 'GnanaStack Technologies is a one-person MERN stack software studio built with skill, consistency, and a strong vision. Started from a village/home-based setup, the mission is to help businesses and institutions move from manual work to modern digital systems through practical, scalable, and professional web applications.' },
    contactEmail: { type: String, default: 'gnanastacktechnologies@gmail.com' },
    contactPhone: { type: String, default: '+91 00000 00000' },
    location: { type: String, default: 'Salem, Tamil Nadu, India - 636117' },
    whatsappNumber: { type: String, default: '910000000000' },
    workMode: { type: String, default: 'Remote-first software studio' },
    footerText: { type: String, default: 'Modern MERN Stack Software Studio building high-impact digital solutions starting from the roots.' },
  },
  {
    timestamps: true,
  }
);

const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);

export default SiteSetting;
