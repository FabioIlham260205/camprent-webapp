import { GearItem } from './types';

// GANTI STRING INI DENGAN CLIENT ID GOOGLE ANDA
export const GOOGLE_CLIENT_ID = '313221582118-8r07t4c9sgrlr7fls4gae5q88p20vbnp.apps.googleusercontent.com';

// Data alat camping (Static JSON)
export const GEAR_ITEMS: GearItem[] = [
  {
    id: 'g1',
    name: 'Tenda Dome 4 Orang (Eiger)',
    category: 'Tenda',
    description: 'Tenda dome double layer kapasitas 4 orang, tahan air dan angin. Cocok untuk camping keluarga atau kelompok kecil.',
    pricePerDay: 50000,
    imageUrl: 'https://picsum.photos/id/1036/800/600',
  },
  {
    id: 'g2',
    name: 'Sleeping Bag Mummy',
    category: 'Tidur',
    description: 'Sleeping bag model mummy dengan bahan polar hangat, tahan suhu hingga 5 derajat celcius.',
    pricePerDay: 15000,
    imageUrl: 'https://picsum.photos/id/1011/800/600',
  },
  {
    id: 'g3',
    name: 'Kompor Portable (Kovar)',
    category: 'Masak',
    description: 'Kompor windproof portable, mudah dibawa dan irit gas. Gratis 1 kaleng gas untuk sewa 3 hari.',
    pricePerDay: 20000,
    imageUrl: 'https://picsum.photos/id/1060/800/600',
  },
  {
    id: 'g4',
    name: 'Carrier 60L + Rain Cover',
    category: 'Tas',
    description: 'Tas carrier kapasitas 60 liter dengan backsystem nyaman. Sudah termasuk rain cover.',
    pricePerDay: 40000,
    imageUrl: 'https://picsum.photos/id/103/800/600',
  },
  {
    id: 'g5',
    name: 'Matras Camping Foil',
    category: 'Tidur',
    description: 'Matras alumunium foil untuk alas tidur agar tidak dingin dari tanah.',
    pricePerDay: 5000,
    imageUrl: 'https://picsum.photos/id/1047/800/600',
  },
  {
    id: 'g6',
    name: 'Lampu Tenda LED',
    category: 'Penerangan',
    description: 'Lampu gantung LED rechargeable, tahan hingga 8 jam penerangan.',
    pricePerDay: 10000,
    imageUrl: 'https://picsum.photos/id/1013/800/600',
  },
  {
    id: 'g7',
    name: 'Nesting / Cooking Set',
    category: 'Masak',
    description: 'Satu set alat masak (panci, wajan, teko) bahan alumunium anodized ringan.',
    pricePerDay: 25000,
    imageUrl: 'https://picsum.photos/id/1070/800/600',
  },
  {
    id: 'g8',
    name: 'Hammock Single',
    category: 'Santai',
    description: 'Ayunan gantung bahan nilon kuat, beban maksimal 150kg.',
    pricePerDay: 10000,
    imageUrl: 'https://picsum.photos/id/1080/800/600',
  },
];

export const MOCK_USER = {
  id: 'u_12345',
  name: 'Budi Petualang',
  email: 'budi@example.com',
  avatarUrl: 'https://picsum.photos/id/64/200/200',
};