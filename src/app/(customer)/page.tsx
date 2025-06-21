import { getSession } from '@/lib/auth';

export default async function Home() {
  const user = await getSession();

  return (
    <>
      <div className='min-h-screen'>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
      </div>
      <div className='min-h-screen'>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
      </div>
      <div className='min-h-screen'>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
        <p>1oasjdijods</p>
      </div>
    </>
  );
}
