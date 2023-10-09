import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserWallet from '@wasp/queries/getUserWallet';
import withdrawFunds from '@wasp/actions/withdrawFunds';

export function CashierPage() {
  const { data: wallet, isLoading, error } = useQuery(getUserWallet);
  const withdrawFundsFn = useAction(withdrawFunds);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleWithdraw = () => {
    withdrawFundsFn({ amount: withdrawalAmount });
    setWithdrawalAmount(0);
  };

  return (
    <div className='p-4'>
      <div>Current Balance: {wallet.balance}</div>
      <div className='flex gap-x-4 py-5'>
        <input
          type='number'
          placeholder='Withdrawal Amount'
          className='px-1 py-2 border rounded text-lg'
          value={withdrawalAmount}
          onChange={(e) => setWithdrawalAmount(parseFloat(e.target.value))}
        />
        <button
          onClick={handleWithdraw}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Withdraw
        </button>
      </div>
      <Link to='/wallet'>Go to Wallet</Link>
    </div>
  );
}