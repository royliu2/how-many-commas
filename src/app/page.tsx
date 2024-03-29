import { Providers } from '@/components/providers/client';

export default function Home() {
  return (
    <Providers>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <button className='btn'>Connect</button>
      </main>
    </Providers>
  );
}
