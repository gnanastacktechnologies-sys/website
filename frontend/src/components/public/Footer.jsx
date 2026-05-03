import { Link } from 'react-router-dom';
import { navLinks } from '../../data/siteData';
import { useSite } from '../../hooks/useSite';

const Footer = () => {
  const { products } = useSite();
  return (
    <footer className="bg-primary pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6 flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white leading-tight">GnanaStack</span>
              <span className="text-[10px] tracking-[0.3em] text-indigo uppercase font-semibold">Technologies</span>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Modern MERN Stack Software Studio building high-impact digital solutions starting from the roots.
            </p>
            <div className="italic text-xs text-indigo/60 font-medium">
              "From Village Vision to Digital Innovation"
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.map(link => (
                <li key={link.text}>
                  <a href={link.href} className="text-muted hover:text-indigo text-sm transition-colors">{link.text}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Our Products</h4>
            <ul className="space-y-4">
               {products.map(product => (
                 <li key={product._id} className="text-muted text-sm hover:text-indigo cursor-pointer transition-colors">
                   {product.title}
                 </li>
               ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact Info</h4>
            <p className="text-muted text-sm leading-relaxed mb-4 italic">
              Available for remote-first projects worldwide.
            </p>
            <p className="text-white text-sm font-semibold mb-2">gnanastacktechnologies@gmail.com</p>
            <p className="text-muted text-sm uppercase tracking-tighter">Tamil Nadu, India</p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs">
            © 2026 GnanaStack Technologies. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center md:justify-start">
            <Link to="/privacy-policy" className="text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">Terms of Service</Link>
            <Link to="/refund-policy" className="text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">Refund Policy</Link>
            <Link to="/cancellation-policy" className="text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
