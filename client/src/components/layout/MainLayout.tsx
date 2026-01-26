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

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      <Header isCollapsed={isCollapsed} />

      <main
        className={`pt-16 min-h-screen flex flex-col transition-all duration-300 ${
          isCollapsed ? "pl-20" : "pl-56"
        }`}
      >
        <div className="flex-1 p-8">{children}</div>

        <footer className="py-6 text-center text-slate-400 text-sm">
          Copyright © PGN Gas All Rights Reserved
        </footer>
      </main>
    </div>
  );
};

export default MainLayout;
