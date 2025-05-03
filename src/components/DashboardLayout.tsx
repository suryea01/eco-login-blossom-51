
import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar";
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Calendar, BarChart2, Award, MessageCircle, Menu, User, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <SidebarProvider defaultCollapsed={window.innerWidth < 768}>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-border transition-all duration-300">
          <SidebarHeader className="flex items-center p-4">
            <div className="flex items-center gap-2 text-primary">
              {role === 'waste-seller' && <Leaf className="w-6 h-6" />}
              <span className="font-bold text-lg">EcoLogin</span>
            </div>
            <SidebarTrigger className="ml-auto md:flex" />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild active={location.pathname === item.path}>
                        <Link 
                          to={item.path} 
                          className="flex items-center gap-2 group"
                          onClick={() => setIsMobileSidebarOpen(false)}
                        >
                          <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                          <span className="transition-all group-hover:translate-x-1">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full flex items-center justify-start gap-2 hover:bg-accent">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span>User Profile</span>
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
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="border-b p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="font-medium text-lg hidden sm:block">
              {navItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
            </div>
            
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>
          
          <div className="flex-1 p-4 md:p-6 transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Add this import at the top
import { Leaf } from 'lucide-react';
