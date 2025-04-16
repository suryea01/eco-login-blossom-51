
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';
import { Home, Upload, Calendar, BarChart2, Award, MessageCircle } from 'lucide-react';

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
