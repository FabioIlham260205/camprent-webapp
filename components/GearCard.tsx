import React from 'react';
import { GearItem } from '../types';
import { Info, CheckCircle, XCircle } from 'lucide-react';

interface GearCardProps {
  item: GearItem;
  isRented: boolean;
  onViewDetail: (item: GearItem) => void;
  onToggleStatus: (id: string) => void;
}

const GearCard: React.FC<GearCardProps> = ({ item, isRented, onViewDetail, onToggleStatus }) => {
  return (
    <div className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border ${isRented ? 'border-orange-200' : 'border-gray-100'}`}>
      {/* Image Container */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200 relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className={`h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${isRented ? 'grayscale-[0.5]' : ''}`}
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
            isRented 
              ? 'bg-orange-100/90 text-orange-700 border border-orange-200' 
              : 'bg-emerald-100/90 text-emerald-700 border border-emerald-200'
          }`}>
            {isRented ? (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                Dipinjam
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Tersedia
              </>
            )}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">{item.category}</p>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {item.description}
        </p>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-xs text-gray-400">Harga per hari</p>
            <p className="text-lg font-bold text-emerald-700">
              Rp {item.pricePerDay.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-4 gap-2">
          <button
            onClick={() => onViewDetail(item)}
            className="col-span-1 flex items-center justify-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors"
            title="Lihat Detail"
          >
            <Info className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onToggleStatus(item.id)}
            className={`col-span-3 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95 ${
              isRented
                ? 'bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
            }`}
          >
            {isRented ? 'Kembalikan Alat' : 'Sewa Sekarang'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GearCard;