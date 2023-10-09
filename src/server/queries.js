import HttpError from '@wasp/core/HttpError.js'

export const getUserBets = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Bet.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getUserWallet = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const wallet = await context.entities.Wallet.findUnique({
    where: { id: context.user.walletId },
  });

  if (!wallet) throw new HttpError(404, 'No wallet found for user');

  return wallet;
}

export const getCurrentAssetPrice = async (args, context) => {
  // Here we don't check if user is authenticated as this query is public.

  // Implement fetching current price of asset from Binance API here.

  // Return the price as a float.
}