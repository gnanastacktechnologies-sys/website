import { useState, useEffect } from 'react';
import Hero from '../../components/public/Hero';
import Products from '../../components/public/Products';
import Services from '../../components/public/Services';
import WhyChoose from '../../components/public/WhyChoose';
import Process from '../../components/public/Process';
import About from '../../components/public/About';
import TechStack from '../../components/public/TechStack';
import Projects from '../../components/public/Projects';
import Contact from '../../components/public/Contact';
import { publicService } from '../../services/publicService';
import { products as fallbackProducts, services as fallbackServices, portfolio as fallbackPortfolio } from '../../data/siteData';

const fallbackSiteData = {
  companyName: 'GnanaStack Technologies',
  tagline: 'From Village Vision to Digital Innovation',
  heroBadge: 'MERN Stack Software Studio',
  heroTitle: 'Building Powerful MERN Stack Products for Modern Businesses',
  heroSubtitle:
    'GnanaStack Technologies builds HRMS platforms, online test portals, digital invitation websites, and custom MERN stack applications for businesses, institutions, and startups.',
  primaryCTA: 'Explore Products',
  secondaryCTA: 'Start Your Project',
  aboutTitle: 'From Village Vision to Digital Innovation',
  aboutDescription:
    'GnanaStack Technologies is a one-person MERN stack software studio focused on practical, scalable, and professional web applications.',
  contactEmail: 'gnanastacktechnologies@gmail.com',
  contactPhone: '+91 00000 00000',
  location: 'Salem, Tamil Nadu, India - 636117',
  whatsappNumber: '910000000000',
  workMode: 'Remote-first software studio',
  footerText:
    'Modern MERN Stack Software Studio building high-impact digital solutions starting from the roots.',
};

const mapFallbackProducts = () =>
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

const mapFallbackServices = () =>
  fallbackServices.map((title, idx) => ({
    _id: `svc-${idx + 1}`,
    title,
    icon: 'HiCode',
    isActive: true,
    order: idx + 1,
  }));

const mapFallbackProjects = () =>
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

const Home = () => {
  const [siteData, setSiteData] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siteRes, prodRes, servRes, projRes] = await Promise.all([
          publicService.getSiteData(),
          publicService.getProducts(),
          publicService.getServices(),
          publicService.getProjects(),
        ]);

        setSiteData(siteRes.data);
        setProducts(prodRes.data);
        setServices(servRes.data);
        setProjects(projRes.data);
      } catch (error) {
        console.error('Failed to fetch home data. Showing fallback content.', error);
        setSiteData(fallbackSiteData);
        setProducts(mapFallbackProducts());
        setServices(mapFallbackServices());
        setProjects(mapFallbackProjects());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProductSelect = (productTitle) => {
    setSelectedProduct(productTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo"></div>
      </div>
    );
  }

  return (
    <>
      <Hero settings={siteData} />
      <TechStack />
      <Products 
        products={products} 
        settings={siteData} 
        onSelectProduct={handleProductSelect}
      />
      <Services services={services} />
      <WhyChoose settings={siteData} />
      <Process />
      <About settings={siteData} />
      <Projects projects={projects} />
      <Contact 
        settings={siteData} 
        initialProduct={selectedProduct}
        activeProducts={products}
      />
    </>
  );
};

export default Home;
