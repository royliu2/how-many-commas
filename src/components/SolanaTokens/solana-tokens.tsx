import type { RawAccount} from '@solana/spl-token'

export type AccountInfo = RawAccount & {
	tokenPrice: number
}
type SolanaTokensProps = {
	tokenAccounts: AccountInfo[]
}

export const SolanaTokens = ({ tokenAccounts }: SolanaTokensProps) => {
	return (
	  <>
      {tokenAccounts.map((tokenAccount) => (
			 	<div key={tokenAccount.mint.toString()} className='flex w-full justify-between'>
					<div className='w-full flex justify-between'>
						<div>
						  Address: {tokenAccount.mint.toString()}
						</div>
						<div>
							Amount: {tokenAccount.amount.toString()}
						</div>
					</div>
				</div>
			)
			)}
		</>
	)
}
