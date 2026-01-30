import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activePage,
  onNavigate,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
      />
      <Header
        isCollapsed={isCollapsed}
        onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
      />

      <main
        className={`pt-16 min-h-screen flex flex-col transition-all duration-300 pl-0 ${
          isCollapsed ? "md:pl-20" : "md:pl-56"
        }`}
      >
        {/* Mobile overlay to close sidebar */}
        {isMobileOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <div className="flex-1 p-4 md:p-8">{children}</div>

        <footer className="py-6 text-center text-slate-400 text-sm">
          Copyright © PGN Gas All Rights Reserved
        </footer>
      </main>
    </div>
  );
};

export default MainLayout;
