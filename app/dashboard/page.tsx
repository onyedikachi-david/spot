"use client"
import { Button } from "@/components/ui/button";
import { getMaxHighVolumeTransactions } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from "react";
// import { useAccount, useNetwork } from "wagmi";
import { useConnect, useDisconnect, useAccount, useNetwork, useBalance } from "wagmi";

export default function Page() {

    const [dataLoaded, setDataLoaded] = useState(false);

    // using decommas sdk


    const [showWalletOptions, setShowWalletOptions] = useState(false);
    const { address: accountData } = useAccount();

    const { chain: activeChain, chains: activeChains } = useNetwork();

    console.log(accountData, activeChain)
    // const result = getMaxHighVolumeTransactions(accountData, "704346c3b9c5f78740adb16b112a53a077877595")
    // console.log(result)

    let maxVolumeDataRef: { hash: Key | null | undefined; from_address: string | number | boolean | ReactPortal | PromiseLikeOfReactNode | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; value: string | number | boolean | ReactPortal | PromiseLikeOfReactNode | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; to_address: string | number | boolean | ReactPortal | PromiseLikeOfReactNode | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; }[] = useRef([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getMaxHighVolumeTransactions(accountData, "704346c3b9c5f78740adb16b112a53a077877595");
            // maxVolumeData = result ?? [];
            maxVolumeDataRef.current = result ?? [];
            // console.log(maxVolumeData);
        };

        fetchData();
        setDataLoaded(true);
    }, [accountData]);

    // getResult();

    if (!dataLoaded) {
        return <p>Loading...</p>;
    }
    return (
        <>
            {/* <div>Account: ${accountData.address}</div>
            <div>Network ID: ${activeChain.id}</div> */}
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <header className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Blockchain Dashboard</h1>
                    {/* <Button className="text-gray-900 dark:text-gray-100 border-gray-900 dark:border-gray-100" variant="outline">
                        Connect Wallet
                    </Button> */}
                    <ConnectButton />
                </header>
                <div className="flex justify-center pt-10">
                    <div className="max-w-7xl w-full space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">High Volume Transactions</h2>
                                <div className="mt-4 space-y-2 overflow-auto">
                                    {maxVolumeDataRef.current && maxVolumeDataRef.current.map((transaction: { hash: Key | null | undefined; from_address: string | number | boolean; to_address: string | number | boolean; value: string | number | boolean; }) => (
                                        <div key={transaction.hash} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md">
                                            <p className="text-gray-900 dark:text-gray-100">
                                                <span className="font-bold">From Address:</span> {transaction.from_address}
                                            </p>
                                            <p className="text-gray-900 dark:text-gray-100">
                                                <span className="font-bold">To Address:</span> {transaction.to_address}
                                            </p>
                                            <p className="text-gray-900 dark:text-gray-100">
                                                <span className="font-bold">Value:</span> {transaction.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Trending Tokens</h2>
                                <div className="mt-4 space-y-2" />
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">On-chain Data Analytics</h2>
                                <div className="mt-4 space-y-2 overflow-auto" />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Volume Over Time</h2>
                            <div className="mt-4">
                                <Image
                                    alt="Line chart of volume over time"
                                    height="200"
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: "200/200",
                                        objectFit: "cover",
                                    }}
                                    width="200"
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Users Address Holdings</h2>
                            <div className="mt-4 space-y-2 overflow-auto">
                                <div className="flex justify-between">
                                    <p className="text-gray-700 dark:text-gray-200">Token</p>
                                    <p className="text-gray-700 dark:text-gray-200">Amount</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700 dark:text-gray-200">BTC</p>
                                    <p className="text-gray-700 dark:text-gray-200">1.5</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700 dark:text-gray-200">ETH</p>
                                    <p className="text-gray-700 dark:text-gray-200">10</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Exposure Over Time</h2>
                            <div className="mt-4">
                                <Image
                                    alt="Line chart of exposure over time"
                                    height="200"
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: "200/200",
                                        objectFit: "cover",
                                    }}
                                    width="200"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}