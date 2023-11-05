import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getMaxHighVolumeTransactions(
  address: any,
  apiKey: any,
  limit = 5
) {
  const url = `https://datalayer.decommas.net/datalayer/api/v1/transactions/${address}?api-key=${apiKey}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      // Sort transactions by value in descending order
      const sortedTransactions = data.result.sort(
        (a: { value: number }, b: { value: number }) => b.value - a.value
      );

      // Return the top 5 high volume transactions
      return sortedTransactions.slice(0, limit);
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function viewOnChainDataAnalysis() {
  const address = "your_address";
  const apiKey = "your_api_key";

  try {
    const protocols = await fetchProtocols(address, apiKey);
    const transfers = await fetchERC20Transfers(address, apiKey);
    const transaction = await fetchTransactionDetails(
      "chain_name",
      "tx_hash",
      apiKey
    );
    const tokens = await fetchERC20Tokens(address, apiKey);
    const coins = await fetchAllCoinsMetadata(apiKey);

    // Perform analysis on the fetched data
    console.log("Protocols:", protocols);
    console.log("ERC20 Transfers:", transfers);
    console.log("Transaction Details:", transaction);
    console.log("ERC20 Tokens:", tokens);
    console.log("All Coins Metadata:", coins);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchProtocols(address: string, apiKey: string) {
  const url = `https://datalayer.decommas.net/datalayer/api/v1/protocols/${address}?api-key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}

async function fetchERC20Transfers(address: string, apiKey: string) {
  const url = `https://datalayer.decommas.net/datalayer/api/v1/transfers_erc20/${address}?api-key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}

async function fetchTransactionDetails(
  chainName: string,
  txHash: string,
  apiKey: string
) {
  const url = `https://datalayer.decommas.net/datalayer/api/v1/transaction/${chainName}/${txHash}?api-key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}

async function fetchERC20Tokens(address: string, apiKey: string) {
  const url = `https://datalayer.decommas.net/datalayer/api/v1/tokens/${address}?api-key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}

async function fetchAllCoinsMetadata(apiKey: string) {
  const url = `https://datalayer.decommas.net/datalayer/api/v1/all_coins_metadata?api-key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}
