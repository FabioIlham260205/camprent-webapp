import React from 'react';
import { User } from '../types';
import { LogOut, Tent } from 'lucide-react';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Tent className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-bold tracking-tight">CampRent</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 bg-emerald-800 py-1 px-3 rounded-full">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="h-8 w-8 rounded-full border-2 border-emerald-400"
              />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-emerald-800 transition-colors flex items-center space-x-2 text-emerald-100 hover:text-white"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;