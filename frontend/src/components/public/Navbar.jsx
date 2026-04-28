import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navLinks } from '../../data/siteData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isHome = location.pathname === '/';

  const scrollToContact = () => {
    setIsMobileMenuOpen(false);
    if (!isHome) {
      navigate('/#contact');
      // Timeout to wait for navigation before scrolling
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('contact');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavLinkClick = (href, onClick) => {
    const sectionId = href.replace('#', '');
    if (onClick) onClick();

    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavItem = ({ link, onClick }) => (
    <button
      type="button"
      onClick={() => handleNavLinkClick(link.href, onClick)}
      className="text-muted hover:text-indigo transition-colors text-sm font-medium"
    >
      {link.text}
    </button>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-primary/95 backdrop-blur-md py-4 ${
        isScrolled
          ? 'md:bg-primary/80 md:backdrop-blur-md md:py-4'
          : 'md:bg-transparent md:backdrop-blur-none md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-tight">GnanaStack</span>
              <span className="text-xs tracking-widest text-indigo uppercase font-semibold">Technologies</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.text} link={link} />
            ))}
            <Link to="/admin/dashboard" className="text-xs font-bold text-muted/50 hover:text-indigo transition-all">Admin</Link>
            <button onClick={scrollToContact} className="btn-primary">Start a Project</button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/admin/dashboard" className="text-xs text-muted/50">Admin</Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white text-3xl"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-screen max-w-none bg-primary z-50 transition-transform duration-300 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="absolute top-6 right-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-3xl p-2"
            aria-label="Close menu"
          >
            <HiX />
          </button>
        </div>
        <div className="h-full overflow-y-auto px-6 pt-24 pb-10">
          <div className="flex flex-col items-center justify-start min-h-full gap-8">
          {navLinks.map((link) => (
            <NavItem key={link.text} link={link} onClick={() => setIsMobileMenuOpen(false)} />
          ))}
          <button onClick={scrollToContact} className="btn-primary mt-4">Start a Project</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
