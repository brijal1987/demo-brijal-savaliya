import React, { useState } from "react";
import { ethers } from "ethers";
import "./ConnectWallet.css";

export const ConnectWallet = ({ sendWalletAddress }) => {
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const [walletClass, setWalletClass] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const connectWallet = async () => {
        setIsLoading(true);
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAddress(address);
                sendWalletAddress(address)
                setWalletClass("success")
                setStatus("Wallet connected successfully");
            } catch (err) {
                setWalletClass("error")
                setStatus("Wallet connection failed");
            }
            finally {
                setIsLoading(false);
            }
        } else {
            setWalletClass("error")
            setStatus("MetaMask is not installed");
            setIsLoading(false);
        }
    };

    return (
      <>
        <p className={walletClass}>{status}</p>
        <button
        onClick={connectWallet}
        disabled={address}
        >
        {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>

        <p>{address && <strong>Connected: </strong>}{address}</p>
        <hr/>
      </>
    )
  }
