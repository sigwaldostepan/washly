import { Calendar, ClipboardList, Home, LucideIcon } from 'lucide-react';

interface Navigation {
  href: string;
  label: string;
}

export const NAVIGATIONS = [
  { href: '/', label: 'home' },
  { href: '/services', label: 'layanan kami' },
  { href: '/bookings/new', label: 'booking' },
] satisfies Navigation[];

interface AdminNavigation extends Navigation {
  icon: LucideIcon;
}

export const ADMIN_NAVIGATIONS = [
  { href: '/admin', label: 'dashboard', icon: Home },
  { href: '/admin/bookings', label: 'booking', icon: Calendar },
  { href: '/admin/services', label: 'layanan', icon: ClipboardList },
] satisfies AdminNavigation[];
