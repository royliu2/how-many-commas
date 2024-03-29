"use client"
import {PrivyProvider} from '@privy-io/react-auth'

export function Providers({children}: {children: React.ReactNode}) {
	console.log(process.env.NEXT_PUBLIC_PRIVY_APP_ID)
  return (
    <PrivyProvider
			appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
