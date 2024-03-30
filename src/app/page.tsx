"use client"

import { ConnectButton } from '@/components/ConnectButton';
import { Dashboard } from '@/components/Dashboard'
import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
  const { ready, authenticated, user } = usePrivy()
  const emails = process.env.NEXT_PUBLIC_EMAIL_ALLOWLIST ?? ''
  const validEmails = emails.split(',')
  const isValidUser = authenticated && validEmails.includes(user?.email?.address ?? '')

  console.log({ emails })
  console.log(user?.email?.address)
  return (
      <main className="flex size-full flex-col items-center justify-center p-8">
        {ready ? authenticated ? (
        isValidUser ? (
          <Dashboard />
        ) : (
          <h1 className='text-6xl font-semibold'>Unauthorized</h1>
        )
        ) : (
          <ConnectButton />
        ) : (
          <p>Loading...</p>
        )}
      </main>
  );
}
