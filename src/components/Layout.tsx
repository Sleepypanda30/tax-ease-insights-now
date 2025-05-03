
import React from "react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { Home, Upload, FileText, MessageSquare } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, className, hideNav = false }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="mobile-container flex flex-col">
      <header className="app-header">
        <h1 className="text-xl font-bold">TaxEase</h1>
      </header>
      
      <main className={cn("app-content flex-1", className)}>
        {children}
      </main>
      
      {!hideNav && (
        <nav className="bg-brand-dark border-t border-brand-lightgray flex justify-around py-2 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
          <NavItem path="/" icon={<Home size={20} />} label="Home" isActive={isActive("/")} />
          <NavItem path="/upload" icon={<Upload size={20} />} label="Upload" isActive={isActive("/upload")} />
          <NavItem path="/advice" icon={<FileText size={20} />} label="Insights" isActive={isActive("/advice")} />
          <NavItem path="/chat" icon={<MessageSquare size={20} />} label="Chat" isActive={isActive("/chat")} />
        </nav>
      )}
    </div>
  );
};

interface NavItemProps {
  path: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ path, icon, label, isActive }) => {
  const activeColor = getColorForPath(path);
  
  return (
    <Link 
      to={path} 
      className={cn(
        "flex flex-col items-center justify-center text-xs px-2 py-1", 
        isActive ? activeColor : "text-taxgray-600"
      )}
    >
      <span className="mb-1">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

// Function to get color based on path
const getColorForPath = (path: string): string => {
  switch (path) {
    case "/":
      return "text-brand-blue";
    case "/upload":
      return "text-brand-orange";
    case "/advice":
      return "text-brand-purple";
    case "/chat":
      return "text-brand-green";
    default:
      return "text-brand-blue";
  }
};

export default Layout;
