import HttpError from '@wasp/core/HttpError.js'
import { getPrice, calculateBustPrice } from './utils.js'

export const createBet = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { amount, leverage, asset, direction } = args;

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  const wallet = await context.entities.Wallet.findUnique({
    where: { id: user.walletId }
  });

  if (wallet.balance < amount) { throw new HttpError(400, 'Insufficient balance') };

  const entryPrice = await getPrice(asset);
  const bustPrice = calculateBustPrice(entryPrice, leverage, direction);

  const newBet = await context.entities.Bet.create({
    data: {
      amount,
      leverage,
      entryPrice,
      bustPrice,
      status: 'Open',
      asset,
      user: { connect: { id: context.user.id } }
    }
  });

  await context.entities.Wallet.update({
    where: { id: wallet.id },
    data: { balance: wallet.balance - amount }
  });

  return newBet;
}

export const closeBet = async (args, context) => {
  // Calculate profit/loss based on current prices.
  // Update user's Wallet balance with profit or loss.
  // Return closed Bet.
}

export const depositFunds = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  })

  const wallet = await context.entities.Wallet.findUnique({
    where: { id: user.walletId }
  })

  const updatedWallet = await context.entities.Wallet.update({
    where: { id: wallet.id },
    data: { balance: wallet.balance + args.amount }
  })

  return updatedWallet
}

export const withdrawFunds = async ({ amount }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  const wallet = await context.entities.Wallet.findUnique({
    where: { id: user.walletId }
  });

  if (wallet.balance < amount) { throw new HttpError(400, 'Insufficient funds') };

  const updatedWallet = await context.entities.Wallet.update({
    where: { id: wallet.id },
    data: { balance: wallet.balance - amount }
  });

  return updatedWallet;
}