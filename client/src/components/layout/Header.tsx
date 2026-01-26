import React, { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  isCollapsed?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isCollapsed = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`h-16 bg-white shadow-sm flex items-center justify-end px-8 fixed top-0 right-0 z-40 transition-all duration-300 ${
        isCollapsed ? "left-20" : "left-56"
      }`}
    >
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-4 border-l pl-6 h-8 cursor-pointer hover:bg-slate-50 transition-colors rounded-l-lg py-6 pr-2"
        >
          <div className="flex flex-col items-end">
            <span className="text-slate-700 font-medium leading-none">
              Admin
            </span>
            <span className="text-xs text-slate-400 mt-1">Administrator</span>
          </div>

          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 overflow-hidden z-50"
            >
              <div className="px-4 py-3 border-b border-slate-50">
                <p className="text-sm font-medium text-slate-900">
                  Signed in as
                </p>
                <p className="text-sm text-slate-500 truncate">
                  admin@pertamina.com
                </p>
              </div>

              <div className="py-1">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User size={16} />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings size={16} />
                  Settings
                </a>
              </div>

              <div className="border-t border-slate-50 py-1">
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  onClick={() => console.log("Logout clicked")}
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
