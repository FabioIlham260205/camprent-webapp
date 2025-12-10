import React, { useState, useEffect } from 'react';
import { GearItem, User, RentalState } from './types';
import { GEAR_ITEMS } from './constants';
import Navbar from './components/Navbar';
import GearCard from './components/GearCard';
import GearDetailModal from './components/GearDetailModal';
import Login from './components/Login';

// Helper keys for localStorage
const STORAGE_KEY_USER = 'camprent_user';
const STORAGE_KEY_RENTALS = 'camprent_rentals';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [rentals, setRentals] = useState<RentalState>({});
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Load initial state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY_USER);
    const storedRentals = localStorage.getItem(STORAGE_KEY_RENTALS);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedRentals) {
      setRentals(JSON.parse(storedRentals));
    }
    setLoadingInitial(false);
  }, []);

  // Save rentals to localStorage whenever they change
  useEffect(() => {
    if (!loadingInitial) {
      localStorage.setItem(STORAGE_KEY_RENTALS, JSON.stringify(rentals));
    }
  }, [rentals, loadingInitial]);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    // Optional: Clear rentals on logout? 
    // Requirement says "Client side state", usually persistent per browser, not per user session for simple demos.
    // We will keep rentals to show persistence.
    
    // Also handy to disable auto-select if using Google One Tap, but standard button is fine.
    if ((window as any).google) {
        (window as any).google.accounts.id.disableAutoSelect();
    }
  };

  const handleToggleStatus = (gearId: string) => {
    setRentals(prev => {
      const currentStatus = prev[gearId]?.isRented || false;
      return {
        ...prev,
        [gearId]: {
          isRented: !currentStatus,
          rentedBy: !currentStatus ? user?.id : undefined,
          rentedAt: !currentStatus ? Date.now() : undefined
        }
      };
    });
  };

  const handleViewDetail = (item: GearItem) => {
    setSelectedGear(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedGear(null), 200); // Clear after animation (if any)
  };

  if (loadingInitial) {
    return <div className="min-h-screen flex items-center justify-center text-emerald-600">Loading...</div>;
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Calculate stats
  const totalItems = GEAR_ITEMS.length;
  const rentedCount = Object.keys(rentals).filter(key => rentals[key]?.isRented).length;
  const availableCount = totalItems - rentedCount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Header Section */}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Daftar Alat Camping
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Pilih perlengkapan untuk petualanganmu berikutnya.
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0 space-x-3">
             <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase font-semibold">Tersedia</span>
                <span className="text-xl font-bold text-emerald-600">{availableCount}</span>
             </div>
             <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase font-semibold">Dipinjam</span>
                <span className="text-xl font-bold text-orange-500">{rentedCount}</span>
             </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {GEAR_ITEMS.map((item) => (
            <GearCard
              key={item.id}
              item={item}
              isRented={rentals[item.id]?.isRented || false}
              onViewDetail={handleViewDetail}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CampRent. Data disimpan secara lokal di browser Anda.
          </p>
        </div>
      </footer>

      <GearDetailModal
        item={selectedGear}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isRented={selectedGear ? (rentals[selectedGear.id]?.isRented || false) : false}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default App;