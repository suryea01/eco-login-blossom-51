
import { EcoChat } from "./EcoBot/EcoChat";

interface MainLayoutProps {
  children: React.ReactNode;
  showEcoBot?: boolean;
}

export const MainLayout = ({ children, showEcoBot = true }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
      {showEcoBot && <EcoChat />}
    </div>
  );
};
