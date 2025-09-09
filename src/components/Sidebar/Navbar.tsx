import React from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { useSidebar } from './SidebarContext';

const Navbar = ({ title = "Bike Ride", showBackButton = false, onBackClick = null }) => {
  const { toggleSidebar } = useSidebar();
  
  return (
    <div className="flex items-center justify-between p-4 border-b-2 border-t-2 sticky top-0 z-30 bg-white shadow-sm">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-[#e0e7ff] transition-colors mr-2"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
        {showBackButton && onBackClick && (
          <button
            onClick={onBackClick}
            className="p-2 hover:bg-[#e0e7ff] transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        )}
      </div>
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      <div className="w-10" />
    </div>
  );
};

export default Navbar;