import React, { useState } from "react";
import {
  LayoutDashboard,
  User,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  isCollapsed,
  toggleCollapse,
}) => {
  const [logoSrc, setLogoSrc] = useState("/logo.svg");
  const [usePlaceholder, setUsePlaceholder] = useState(false);

  const handleImageError = () => {
    if (logoSrc === "/logo.svg") {
      // Fallback to png if svg fails
      setLogoSrc("/logo.png");
    } else {
      // Fallback to placeholder if both fail
      setUsePlaceholder(true);
    }
  };

  const getLinkClasses = (pageName: string) => {
    const isActive = activePage === pageName;
    return `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-700 text-white font-medium"
        : "text-blue-100 hover:bg-blue-700"
    } ${isCollapsed ? "justify-center px-2" : ""}`;
  };

  return (
    <div
      className={`bg-blue-600 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ${isCollapsed ? "w-20" : "w-56"}`}
    >
      {/* Logo Area */}
      <div
        className="flex justify-center border-b border-blue-500 overflow-hidden relative transition-all duration-300"
        style={{ height: isCollapsed ? "70px" : "90px" }}
      >
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            isCollapsed ? "w-12 h-12 mt-3" : `w-36 h-36 -mt-8`
          } ${usePlaceholder ? "bg-white p-2 rounded-lg" : ""}`}
        >
          {!usePlaceholder ? (
            <img
              src={logoSrc}
              alt="Pertamina Logo"
              className="w-full h-full object-contain"
              onError={handleImageError}
            />
          ) : (
            <div
              className={`${isCollapsed ? "w-8 h-8" : "w-24 h-24"} flex flex-col justify-center items-center`}
            >
              <div
                className={`${isCollapsed ? "w-4 h-4" : "w-12 h-12"} bg-blue-600 transform rotate-45 ${isCollapsed ? "mb-[-8px]" : "mb-[-24px]"}`}
              ></div>
              <div className={`flex ${isCollapsed ? "gap-1" : "gap-2"}`}>
                <div
                  className={`${isCollapsed ? "w-3 h-3" : "w-10 h-10"} bg-red-500 transform rotate-45`}
                ></div>
                <div
                  className={`${isCollapsed ? "w-3 h-3" : "w-10 h-10"} bg-green-500 transform rotate-45`}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <div className="px-4 py-2">
          <button
            onClick={() => onNavigate("dashboard")}
            className={`w-full ${getLinkClasses("dashboard")}`}
            title={isCollapsed ? "Dashboard" : ""}
          >
            <LayoutDashboard size={20} />
            {!isCollapsed && <span>Dashboard</span>}
          </button>
        </div>

        {!isCollapsed && (
          <div className="mt-4 px-6 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
            AKUN
          </div>
        )}
        <div className={`px-4 ${isCollapsed ? "mt-4" : ""}`}>
          <button
            onClick={() => onNavigate("profile")}
            className={`w-full ${getLinkClasses("profile")}`}
            title={isCollapsed ? "Profile" : ""}
          >
            <User size={18} />
            {!isCollapsed && <span>Profile</span>}
          </button>
        </div>

        {!isCollapsed && (
          <div className="mt-4 px-6 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
            AKTIVITAS
          </div>
        )}
        <div className={`px-4 space-y-1 ${isCollapsed ? "mt-4" : ""}`}>
          <button
            onClick={() => onNavigate("notulen")}
            className={`w-full ${getLinkClasses("notulen")}`}
            title={isCollapsed ? "Notulen" : ""}
          >
            <FileText size={18} />
            {!isCollapsed && <span>Notulen</span>}
          </button>
        </div>
      </div>

      {/* Collapse Button */}
      <div className="p-4 flex justify-center border-t border-blue-500">
        <button
          onClick={toggleCollapse}
          className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
