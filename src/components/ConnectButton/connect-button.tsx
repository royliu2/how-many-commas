import { usePrivy } from '@privy-io/react-auth';

export function ConnectButton() {
	const { login } = usePrivy()
	return (
		<button className="btn" onClick={login}>Connect</button>
	);
}
