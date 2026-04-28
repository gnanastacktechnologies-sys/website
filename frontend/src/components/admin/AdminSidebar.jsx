import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiChartPie, 
  HiCog, 
  HiCube, 
  HiChip, 
  HiCollection, 
  HiInboxIn, 
  HiLogout,
  HiChevronLeft,
  HiChevronRight,
  HiX,
  HiUser
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <HiChartPie />, path: '/admin/dashboard' },
    { text: 'Site Settings', icon: <HiCog />, path: '/admin/site-settings' },
    { text: 'Products', icon: <HiCube />, path: '/admin/products' },
    { text: 'Services', icon: <HiChip />, path: '/admin/services' },
    { text: 'Projects', icon: <HiCollection />, path: '/admin/projects' },
    { text: 'Enquiries', icon: <HiInboxIn />, path: '/admin/enquiries' },
    { text: 'Account Settings', icon: <HiUser />, path: '/admin/profile' },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 flex flex-col bg-[#050816] border-r border-white/5 transition-all duration-300 transform
    ${isMobileOpen ? 'translate-x-0 w-full sm:w-80' : '-translate-x-full lg:translate-x-0'}
    ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
    lg:sticky lg:top-0 lg:h-screen
    overscroll-contain
  `;

  return (
    <aside className={sidebarClasses}>
      <div className={`p-6 flex items-center ${isCollapsed ? 'lg:justify-center' : 'justify-between'}`}>
        {(!isCollapsed || isMobileOpen) && (
          <Link to="/admin/dashboard" className="flex flex-col" onClick={() => setIsMobileOpen(false)}>
            <span className="text-xl font-bold text-white tracking-tight">GnanaStack</span>
            <span className="text-[10px] text-indigo font-bold tracking-[0.2em] uppercase">Admin Portal</span>
          </Link>
        )}
        
        {/* Toggle Desktop */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex p-2 rounded-lg bg-white/5 text-muted hover:text-white transition-all"
        >
          {isCollapsed ? <HiChevronRight /> : <HiChevronLeft />}
        </button>

        {/* Close Mobile */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-2 rounded-lg bg-white/5 text-muted hover:text-white transition-all"
        >
          <HiX />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-2 mt-4 overflow-y-auto custom-scrollbar overscroll-contain">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileOpen(false)}
            title={isCollapsed ? item.text : ''}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              location.pathname === item.path
                ? 'bg-indigo text-white shadow-lg shadow-indigo/20'
                : 'text-muted hover:bg-white/5 hover:text-white'
            } ${isCollapsed && !isMobileOpen ? 'lg:justify-center' : ''}`}
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            {(!isCollapsed || isMobileOpen) && <span>{item.text}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : ''}
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-all ${isCollapsed && !isMobileOpen ? 'lg:justify-center' : ''}`}
        >
          <HiLogout className="text-xl shrink-0" />
          {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
