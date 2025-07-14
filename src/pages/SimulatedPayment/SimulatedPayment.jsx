import { useState } from "react";
import { sendSimulatedPayment } from "../../services/simulated-payment-services/sendSimulatedPayment";
import { PaymentData } from "./components/Paymentdata/Paymentdata";
import { ConnectWallet } from "./components/ConnectWallet/ConnectWallet";
import "./SimulatedPayment.css";

export const SimulatedPayment = () => {
  const [status, setStatus] = useState("");
  const [paymentClass, setPaymentClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  function handleSetWalletAddress(address) {
    setWalletAddress(address);
  }
  
  const simulatePayment = async () => {
    setIsLoading(true);
    // Sending Real Payment (Testnet)
    // const provider = new ethers.BrowserProvider(window.ethereum);
    // const signer = await provider.getSigner();

    // const tx = await signer.sendTransaction({
    //  to: "0xRecipientAddressHere",
    //  value: ethers.parseEther("0.001"), // real transfer
    // });

    const fakePayment = {
      from: walletAddress,
      to: "0xFakeRecipient0000000000000000000000",
      amount: "0.01 ETH",
      status: "success",
      timestamp: new Date().toISOString()
    };

    try {
      const {
        data: {
          data: {
            paymentPayload
          }
        },
        message
      } = await sendSimulatedPayment(fakePayment);
      setPaymentData(paymentPayload)
      setStatus(message || "Payment simulated successfully");
      setPaymentClass("success");
    } catch (error) {
      setPaymentClass("error");
      setStatus("Failed to send simulated payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="simulated-payment-container">
      <h2>Wallet Payment Simulator</h2>
      <h4>Prerequisite:</h4>
      <ul>
        <li>For wallet Connection, add extension Metamask in a browser</li>
        <li>Simulated payment, added simple test data</li>
      </ul>
      <ConnectWallet sendWalletAddress={handleSetWalletAddress} />
      {walletAddress && (
        <button
          onClick={simulatePayment}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Simulate Payment"}
        </button>
      )}
      <p className={paymentClass}>{status}</p>
      {paymentData ? <PaymentData paymentData={paymentData} /> : ""}
    </div>
  );
};
