import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { BookingHistory } from './_components';

const BookingHistoryPage = async () => {
  const session = await getSession();

  if (!session) {
    return redirect('/login?error=unauthorized&message=Harus login terlebih dahulu.');
  }

  return <BookingHistory user={session.user} />;
};

export default BookingHistoryPage;
