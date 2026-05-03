import { useState, useEffect } from 'react';
import { publicService } from '../services/publicService';
import { SiteContext } from './SiteContext';
import { 
  fallbackSiteData, 
  mapFallbackProducts, 
  mapFallbackServices, 
  mapFallbackProjects 
} from '../utils/siteHelpers';

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(fallbackSiteData);
  const [products, setProducts] = useState(mapFallbackProducts());
  const [services, setServices] = useState(mapFallbackServices());
  const [projects, setProjects] = useState(mapFallbackProjects());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await publicService.getHomeData();
        const { settings, products, services, projects } = res.data;

        if (settings) setSiteData(settings);
        if (products?.length) setProducts(products);
        if (services?.length) setServices(services);
        if (projects?.length) setProjects(projects);
      } catch (error) {
        console.error('Failed to fetch site data. Using fallback content.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SiteContext.Provider value={{ siteData, products, services, projects, loading }}>
      {children}
    </SiteContext.Provider>
  );
};
