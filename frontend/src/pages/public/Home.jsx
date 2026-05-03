import { useState } from 'react';
import Hero from '../../components/public/Hero';
import Products from '../../components/public/Products';
import Services from '../../components/public/Services';
import WhyChoose from '../../components/public/WhyChoose';
import Process from '../../components/public/Process';
import About from '../../components/public/About';
import TechStack from '../../components/public/TechStack';
import Projects from '../../components/public/Projects';
import Contact from '../../components/public/Contact';
import { useSite } from '../../hooks/useSite';

const Home = () => {
  const { siteData, products, services, projects, loading } = useSite();
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleProductSelect = (productTitle) => {
    setSelectedProduct(productTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] overflow-hidden bg-primary">
          <div className="h-full bg-indigo animate-loading-bar shadow-[0_0_10px_#4f46e5]"></div>
        </div>
      )}
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
