import { products as fallbackProducts, services as fallbackServices, portfolio as fallbackPortfolio } from '../data/siteData';

export const fallbackSiteData = {
  companyName: 'GnanaStack Technologies',
  tagline: 'From Village Vision to Digital Innovation',
  heroBadge: 'MERN Stack Software Studio',
  heroTitle: 'Building Powerful MERN Stack Products for Modern Businesses',
  heroSubtitle: 'GnanaStack Technologies builds HRMS platforms, online test portals, digital invitation websites, and custom MERN stack applications for businesses, institutions, and startups.',
  primaryCTA: 'Explore Products',
  secondaryCTA: 'Start Your Project',
  aboutTitle: 'From Village Vision to Digital Innovation',
  aboutDescription: 'GnanaStack Technologies is a one-person MERN stack software studio focused on practical, scalable, and professional web applications.',
  contactEmail: 'gnanastacktechnologies@gmail.com',
  contactPhone: '+91 00000 00000',
  location: 'Salem, Tamil Nadu, India - 636117',
  whatsappNumber: '910000000000',
  workMode: 'Remote-first software studio',
  footerText: 'Modern MERN Stack Software Studio building high-impact digital solutions starting from the roots.',
};

export const mapFallbackProducts = () =>
  fallbackProducts.map((p, idx) => ({
    _id: p.id,
    title: p.title,
    slug: p.id,
    shortDescription: p.description,
    description: p.description,
    features: p.features || [],
    isActive: true,
    order: idx + 1,
  }));

export const mapFallbackServices = () =>
  fallbackServices.map((title, idx) => ({
    _id: `svc-${idx + 1}`,
    title,
    icon: 'HiCode',
    isActive: true,
    order: idx + 1,
  }));

export const mapFallbackProjects = () =>
  fallbackPortfolio.map((p, idx) => ({
    _id: `proj-${idx + 1}`,
    title: p.title,
    type: 'Sample',
    description: p.description,
    techStack: p.tech || [],
    imageUrl: '',
    isActive: true,
    order: idx + 1,
  }));
