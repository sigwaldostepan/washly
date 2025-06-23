export const getBookingStatusColor = (status: string, variant?: 'default' | 'outline') => {
  switch (status) {
    case 'PENDING':
      return variant === 'outline'
        ? 'bg-yellow-50 border border-yellow-500 hover:text-primary-foreground hover:bg-yellow-600 text-yellow-600'
        : 'bg-yellow-600 hover:bg-yellow-600/80';
    case 'BOOKED':
      return variant === 'outline'
        ? 'bg-primary-foreground border border-primary hover:text-primary-foreground hover:bg-primary text-primary'
        : 'bg-primary hover:bg-primary/80';
    case 'COMPLETED':
      return variant === 'outline'
        ? 'bg-green-50 border border-green-500 hover:text-primary-foreground hover:bg-green-600 text-green-600'
        : 'bg-green-600 hover:bg-green-600/80';
    case 'CANCELED':
      return variant === 'outline'
        ? 'bg-red-50 border border-red-500 hover:text-primary-foreground hover:bg-red-600 text-red-500'
        : 'bg-red-600 hover:bg-red-600/80';
  }
};
