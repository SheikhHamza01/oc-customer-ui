
"use client"

import { useState } from "react"
import CollapsibleSection from "./components/CollapsibleSection"
import WalletForm from "./components/WalletForm"
import BankForm from "./components/BankForm"
import WalletsTable from "./components/WalletsTable"
import BanksTable from "./components/BanksTable"
import { useTheme } from "../../../contexts/themeContext";

interface BankAndWalletProps {
  onNext: () => void;
  onBack: () => void;
}


export default function BankAndWallet({ onNext, onBack }: BankAndWalletProps) {
    const { theme } = useTheme();

  const [wallets] = useState([
    { id: "BTC", type: "Cold", exchange: "Binance", address: "1A2B3C...", status: "Completed" },
    { id: "ETH", type: "Hot", exchange: "Coinbase", address: "0xAbc...", status: "Pending" },
  ])

  const [banks] = useState([
    { name: "Habib Bank", accountNumber: "123456789", swiftBic: "HABBPKKA", currency: "PKR", status: "Completed" },
    { name: "Meezan Bank", accountNumber: "987654321", swiftBic: "MEZNPKKA", currency: "USD", status: "Pending" },
  ])

  return (
    <div className="flex-1 p-8 bg-color-stepper-light">
      <div className=" mx-auto space-y-8">
        

        {/* Add Wallets */}
        <CollapsibleSection title="Add Wallets">
          <WalletForm />
        </CollapsibleSection>

        {/* Wallets Table */}
        <WalletsTable wallets={wallets} />

        {/* Add Bank */}
        <CollapsibleSection title="Add Bank">
          <BankForm />
        </CollapsibleSection>

        {/* Banks Table */}
        <BanksTable banks={banks} />
      </div>

    </div>
  )
}
