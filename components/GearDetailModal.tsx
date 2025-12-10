import React from 'react';
import { GearItem } from '../types';
import { X, Calendar, Tag, ShieldCheck } from 'lucide-react';

interface GearDetailModalProps {
  item: GearItem | null;
  isOpen: boolean;
  onClose: () => void;
  isRented: boolean;
  onToggleStatus: (id: string) => void;
}

const GearDetailModal: React.FC<GearDetailModalProps> = ({ item, isOpen, onClose, isRented, onToggleStatus }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="bg-white/50 hover:bg-white rounded-full p-2 text-gray-800 transition-colors backdrop-blur-sm"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Side */}
            <div className="h-64 md:h-full relative bg-gray-200">
               <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:hidden">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="hidden md:block mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mb-2">
                  <Tag className="w-3 h-3 mr-1" />
                  {item.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
              </div>

              <div className="space-y-4 flex-grow">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Deskripsi</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.description}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-gray-600 flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2" /> Harga Sewa
                     </span>
                     <span className="text-xl font-bold text-emerald-700">Rp {item.pricePerDay.toLocaleString('id-ID')}</span>
                  </div>
                   <div className="flex items-center justify-between">
                     <span className="text-gray-600 flex items-center text-sm">
                        <ShieldCheck className="w-4 h-4 mr-2" /> Status
                     </span>
                     <span className={`text-sm font-semibold px-2 py-0.5 rounded ${isRented ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {isRented ? 'Sedang Dipinjam' : 'Tersedia'}
                     </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    onToggleStatus(item.id);
                    onClose();
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] ${
                    isRented
                      ? 'bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {isRented ? 'Kembalikan Alat Ini' : 'Sewa Alat Ini'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GearDetailModal;