import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Calendar, BarChart2, Award, MessageCircle, Menu, User, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Leaf } from 'lucide-react';

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
  switch (role) {
    case 'waste-seller':
      return [
        { title: 'Dashboard', icon: Home, path: '/dashboard/waste-seller' },
        { title: 'Upload Waste', icon: Upload, path: '/dashboard/waste-seller/upload' },
        { title: 'Pickups', icon: Calendar, path: '/dashboard/waste-seller/pickups' },
        { title: 'Statistics', icon: BarChart2, path: '/dashboard/waste-seller/stats' },
        { title: 'Rewards', icon: Award, path: '/dashboard/waste-seller/rewards' }
      ];
    case 'waste-buyer':
      return [
        { title: 'Dashboard', icon: Home, path: '/dashboard/waste-buyer' },
        { title: 'Marketplace', icon: Upload, path: '/dashboard/waste-buyer/marketplace' },
        { title: 'Pickups', icon: Calendar, path: '/dashboard/waste-buyer/pickups' },
        { title: 'Certifications', icon: Award, path: '/dashboard/waste-buyer/certs' }
      ];
    case 'product-seller':
      return [
        { title: 'Dashboard', icon: Home, path: '/dashboard/product-seller' },
        { title: 'Post Product', icon: Upload, path: '/dashboard/product-seller/post' },
        { title: 'Inventory', icon: BarChart2, path: '/dashboard/product-seller/inventory' },
        { title: 'Orders', icon: Calendar, path: '/dashboard/product-seller/orders' }
      ];
    case 'product-buyer':
      return [
        { title: 'Dashboard', icon: Home, path: '/dashboard/product-buyer' },
        { title: 'Marketplace', icon: Upload, path: '/dashboard/product-buyer/marketplace' },
        { title: 'Orders', icon: Calendar, path: '/dashboard/product-buyer/orders' },
        { title: 'Impact', icon: BarChart2, path: '/dashboard/product-buyer/impact' }
      ];
    case 'delivery':
      return [
        { title: 'Dashboard', icon: Home, path: '/dashboard/delivery' },
        { title: 'Tasks', icon: Calendar, path: '/dashboard/delivery/tasks' },
        { title: 'Schedule', icon: Calendar, path: '/dashboard/delivery/schedule' },
        { title: 'Reviews', icon: MessageCircle, path: '/dashboard/delivery/reviews' }
      ];
    case 'ai-assistant':
      return [
        { title: 'Dashboard', icon: Home, path: '/dashboard/ai-assistant' },
        { title: 'Chat', icon: MessageCircle, path: '/dashboard/ai-assistant/chat' }
      ];
    default:
      return [];
  }
};

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const navItems = getNavItems(role);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <div className={`border-r border-border transition-all duration-300 bg-sidebar-background text-sidebar-foreground ${
        collapsed ? "w-16" : "w-64"
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center p-4 border-b border-sidebar-border">
          <div className={`flex items-center gap-2 text-primary ${collapsed ? "justify-center w-full" : ""}`}>
            {role === 'waste-seller' && <Leaf className="w-6 h-6" />}
            {!collapsed && <span className="font-bold text-lg">EcoLogin</span>}
          </div>
          <Button
            variant="ghost" 
            size="icon"
            className={`${collapsed ? "hidden" : "ml-auto"}`}
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Sidebar Content */}
        <div className="py-4">
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
              >
                <item.icon className={`w-5 h-5 transition-transform ${collapsed ? "mx-auto" : ""}`} />
                {!collapsed && <span className="transition-all group-hover:translate-x-1">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`${
                collapsed ? "w-full justify-center" : "w-full flex items-center justify-start"
              } gap-2 hover:bg-accent`}>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                {!collapsed && <span>User Profile</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
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
          
          <div className={`font-medium text-lg hidden sm:block ${collapsed ? "" : "ml-4"}`}>
            {navItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
          </div>
          
          <div className={`ml-auto flex items-center gap-2 ${collapsed ? "" : "mr-2"}`}>
            <ThemeToggle />
          </div>
        </header>
        
        <div className="flex-1 p-4 md:p-6 transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
          {children}
        </div>
      </main>
    </div>
  );
};
