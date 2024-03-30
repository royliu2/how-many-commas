import { useCallback, useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { PublicKey, Connection } from '@solana/web3.js'
import { AccountLayout } from '@solana/spl-token'
import { SolanaTokens, type AccountInfo } from '@/components/SolanaTokens'

export const Dashboard = () => {
	const { logout } = usePrivy()
	const [tokenAccounts, setTokenAccounts] = useState<AccountInfo[]>([])

	const fetchSolanaTokens = useCallback(async () => {
		const rpcUrl = `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
		const pubKey = new PublicKey(process.env.NEXT_PUBLIC_SOLANA_ADDRESS ?? '')
		const connection = new Connection(rpcUrl)

    if (!pubKey) return

		const tokenAccountsByOwner = await connection.getTokenAccountsByOwner(pubKey, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')})
		const tokenAddresses = tokenAccountsByOwner.value.map((account) => account.pubkey.toString())
		const tokenPricesResponse = await fetch(`https://public-api.birdeye.so/defi/multi_price?list_address=${encodeURIComponent(tokenAddresses.join(','))}`, {
				method: 'GET',
				mode: 'cors',
				headers: {
				  'x-chain': 'solana',
				 	'X-API-KEY': process.env.NEXT_PUBLIC_BIRDEYE_API_KEY ?? '',
				}
		})
		console.log({tokenPricesResponse})
		const tokenAccounts = await Promise.all(tokenAccountsByOwner.value.map(async (account) => {
      const rawAccount = AccountLayout.decode(account.account.data)
			return { ...rawAccount, tokenPrice: tokenPricesResponse.data?.[account.pubkey.toString()] }
	  }))

		const sortedAccounts = tokenAccounts.sort((a, b) => Number(b.amount - a.amount))
		console.log({ sortedAccounts })

		setTokenAccounts(sortedAccounts)
	},[])

	useEffect(() => {
		fetchSolanaTokens()
	}, [])

	return (
		<div className='relative size-full flex flex-col items-center'>
			<button className='btn absolute top-2 right-0' onClick={logout}>Logout</button>
			<h1 className='text-6xl font-semibold'>Dashboard</h1>
			{tokenAccounts.length > 0 ? (<SolanaTokens tokenAccounts={tokenAccounts} />) : null}	
		</div>
	);
}
