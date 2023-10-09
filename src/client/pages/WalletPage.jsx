import React from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import depositFunds from '@wasp/actions/depositFunds';
import getUserWallet from '@wasp/queries/getUserWallet';

export function WalletPage() {
  const { data: wallet, isLoading, error } = useQuery(getUserWallet);
  const depositFundsFn = useAction(depositFunds);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleDeposit = () => {
    depositFundsFn();
  };

  return (
    <div className='p-4'>
      <h2>Wallet Page</h2>
      <p>Address: {wallet.address}</p>
      <p>Balance: {wallet.balance} USD</p>
      <button
        onClick={handleDeposit}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Deposit Funds
      </button>
    </div>
  );
}