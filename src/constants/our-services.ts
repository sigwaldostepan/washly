import { Armchair, Car, LucideIcon, Star } from 'lucide-react';

export interface OurServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ourServices: OurServiceItem[] = [
  {
    icon: Car,
    title: 'cuci mobil',
    description:
      'Bikin luar mobil kamu auto glowing! Paket ini udah termasuk cuci manual, ban dibikin kinclong, plus semua kaca jadi bening.',
  },
  {
    icon: Armchair,
    title: 'interior detailing',
    description: 'Paket Manjain Interior, Biar Kabinnya Wangi & Bikin Betah ',
  },
  {
    icon: Star,
    title: 'paket lengkap perawatan mobil',
    description: 'Spa Day Komplit! Paket Manja Luar-Dalem Biar Kinclong Sempurna ',
  },
];
