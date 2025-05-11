
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Upload, Calendar, BarChart2, Award, MessageCircle, Menu, User, LogOut, X, Settings, Send } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Leaf } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const getNavItems = (role: string): NavItem[] => {
  const baseItems = [
    { title: 'Dashboard', icon: Home, path: `/dashboard/${role}` },
    { title: 'Profile', icon: User, path: '/profile' },
    { title: 'Feedback', icon: Send, path: '/feedback' },
  ];

  const roleSpecificItems: Record<string, NavItem[]> = {
    'waste-seller': [
      { title: 'Upload Waste', icon: Upload, path: '/dashboard/waste-seller/upload' },
      { title: 'Pickups', icon: Calendar, path: '/dashboard/waste-seller/pickups' },
      { title: 'Statistics', icon: BarChart2, path: '/dashboard/waste-seller/stats' },
      { title: 'Rewards', icon: Award, path: '/dashboard/waste-seller/rewards' }
    ],
    'waste-buyer': [
      { title: 'Marketplace', icon: Upload, path: '/dashboard/waste-buyer/marketplace' },
      { title: 'Pickups', icon: Calendar, path: '/dashboard/waste-buyer/pickups' },
      { title: 'Certifications', icon: Award, path: '/dashboard/waste-buyer/certs' }
    ],
    'product-seller': [
      { title: 'Post Product', icon: Upload, path: '/dashboard/product-seller/post' },
      { title: 'Inventory', icon: BarChart2, path: '/dashboard/product-seller/inventory' },
      { title: 'Orders', icon: Calendar, path: '/dashboard/product-seller/orders' }
    ],
    'product-buyer': [
      { title: 'Marketplace', icon: Upload, path: '/dashboard/product-buyer/marketplace' },
      { title: 'Orders', icon: Calendar, path: '/dashboard/product-buyer/orders' },
      { title: 'Impact', icon: BarChart2, path: '/dashboard/product-buyer/impact' }
    ],
    'delivery': [
      { title: 'Tasks', icon: Calendar, path: '/dashboard/delivery/tasks' },
      { title: 'Schedule', icon: Calendar, path: '/dashboard/delivery/schedule' },
      { title: 'Reviews', icon: MessageCircle, path: '/dashboard/delivery/reviews' }
    ],
    'ai-assistant': [
      { title: 'Chat', icon: MessageCircle, path: '/dashboard/ai-assistant/chat' }
    ]
  };

  return [
    ...baseItems,
    ...(roleSpecificItems[role] || []),
  ];
};

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const navItems = getNavItems(role);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setCollapsed(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile sidebar overlay */}
      {!collapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed md:static inset-y-0 left-0 z-30 transition-all duration-300 bg-sidebar-background text-sidebar-foreground border-r border-border
          ${collapsed ? "-translate-x-full md:translate-x-0 md:w-16" : "translate-x-0 w-64"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center p-4 border-b border-sidebar-border">
          <div className={`flex items-center gap-2 text-primary ${collapsed && !isMobile ? "justify-center w-full" : ""}`}>
            <Leaf className="w-6 h-6" />
            {(!collapsed || isMobile) && <span className="font-bold text-lg">ECOGREEN</span>}
          </div>
          
          {(!collapsed && isMobile) && (
            <Button
              variant="ghost" 
              size="icon"
              className="ml-auto"
              onClick={() => setCollapsed(true)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          
          {(!collapsed && !isMobile) && (
            <Button
              variant="ghost" 
              size="icon"
              className="ml-auto"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {/* Sidebar Content */}
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-2 group py-2 px-3 rounded-md transition-colors ${
                  location.pathname === item.path 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
                onClick={() => isMobile && setCollapsed(true)}
              >
                <item.icon className={`w-5 h-5 transition-transform ${collapsed && !isMobile ? "mx-auto" : ""}`} />
                {(!collapsed || isMobile) && <span className="transition-all group-hover:translate-x-1">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`${
                collapsed && !isMobile ? "w-full justify-center" : "w-full flex items-center justify-start"
              } gap-2 hover:bg-accent`}>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={profile?.avatar_url || ""} alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                {(!collapsed || isMobile) && <span>User Profile</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen w-full">
        <header className="border-b p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          {collapsed && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <div className="font-medium text-lg hidden sm:block">
            {navItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        
        <div className="flex-1 p-4 md:p-6 transition-all duration-300 animate-[fadeIn_0.3s_ease-out] w-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
