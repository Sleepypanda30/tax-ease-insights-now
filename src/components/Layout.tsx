
import React from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

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
        <nav className="bg-white border-t border-gray-200 flex justify-around py-2">
          <NavItem path="/" icon="home" label="Home" isActive={isActive("/")} />
          <NavItem path="/upload" icon="upload" label="Upload" isActive={isActive("/upload")} />
          <NavItem path="/advice" icon="file-text" label="Advice" isActive={isActive("/advice")} />
          <NavItem path="/chat" icon="message-square" label="Chat" isActive={isActive("/chat")} />
        </nav>
      )}
    </div>
  );
};

interface NavItemProps {
  path: string;
  icon: string;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ path, icon, label, isActive }) => {
  const iconClass = `lucide-${icon}`;
  
  return (
    <a 
      href={path} 
      className={cn(
        "flex flex-col items-center justify-center text-xs px-2", 
        isActive ? "text-taxblue" : "text-taxgray-500"
      )}
    >
      <span className={cn("w-5 h-5 mb-1", iconClass)} />
      <span>{label}</span>
    </a>
  );
};

export default Layout;
