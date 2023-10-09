import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createBet from '@wasp/actions/createBet';
import getUserBets from '@wasp/queries/getUserBets';
import getCurrentAssetPrice from '@wasp/queries/getCurrentAssetPrice';

export function HomePage() {
  const { data: assets, isLoading: assetsLoading, error: assetsError } = useQuery(getAssets);
  const { data: bets, isLoading: betsLoading, error: betsError } = useQuery(getUserBets);
  const { data: assetPrice, isLoading: assetPriceLoading, error: assetPriceError } = useQuery(getCurrentAssetPrice);
  const createBetFn = useAction(createBet);

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [leverage, setLeverage] = useState(1);
  const [betAmount, setBetAmount] = useState(0);

  const handleCreateBet = () => {
    createBetFn({
      asset: selectedAsset,
      leverage: leverage,
      amount: betAmount
    });
    setBetAmount(0);
  };

  if (assetsLoading || betsLoading || assetPriceLoading) return 'Loading...';
  if (assetsError || betsError || assetPriceError) return 'Error: ' + (assetsError || betsError || assetPriceError);

  return (
    <div className="">
      <div className="">
        <select
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
        >
          {assets.map((asset) => (
            <option key={asset} value={asset}>{asset}</option>
          ))}
        </select>
      </div>
      <div className="">
        {/* Chart component using assetPrice */}
      </div>
      <div className="">
        <input
          type="range"
          min="1"
          max="1000"
          value={leverage}
          onChange={(e) => setLeverage(parseInt(e.target.value))}
        />
      </div>
      <div className="">
        <button onClick={handleCreateBet} className="">
          Buy
        </button>
        <button onClick={handleCreateBet} className="">
          Sell
        </button>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
        />
      </div>
      <div className="">
        <h2>Active Bets</h2>
        {bets.map((bet) => (
          <div key={bet.id} className="">
            <p>Entry Price: {bet.entryPrice}</p>
            <p>Bust Price: {bet.bustPrice}</p>
            <p>Profit/Loss: {bet.profitLoss}</p>
          </div>
        ))}
      </div>
      <div className="">
        <h2>Historical Bets</h2>
        {/* Container for historical closed bets */}
      </div>
    </div>
  );
}