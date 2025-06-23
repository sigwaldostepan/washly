import { getSession } from '@/lib/auth';
import { CreateBooking } from '../../_components';
import { redirect } from 'next/navigation';

const CreateBookingPage = async () => {
  const session = await getSession();

  if (!session) {
    return redirect('/login?error=unauthorized&message=Harus login terlebih dahulu.');
  }

  return <CreateBooking user={session?.user} />;
};

export default CreateBookingPage;
