"use client"

export default function WalletForm() {
  return (
<form className="mt-4 bg-color-tableBody-light rounded-lg border border-gray-200 p-6 space-y-6">
  {/* Row 1: Crypto Currency & Wallet Type */}
  <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
    <div className="w-full md:w-1/2">
      <label className="block text-sm font-medium text-color-light mb-2">Crypto Currency</label>
      <input
        type="text"
        className="w-full border border-color-light rounded-lg px-3 py-2"
        placeholder="BTC / ETH / ..."
      />
    </div>
    <div className="w-full md:w-1/2">
      <label className="block text-sm font-medium text-color-light mb-2">Wallet Type</label>
      <input
        type="text"
        className="w-full border border-color-light rounded-lg px-3 py-2"
        placeholder="Hot / Cold"
      />
    </div>
  </div>

  {/* Row 2: Exchange & Wallet Address */}
  <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
    <div className="w-full md:w-1/2">
      <label className="block text-sm font-medium text-color-light mb-2">Exchange</label>
      <input
        type="text"
        className="w-full border border-color-light rounded-lg px-3 py-2"
        placeholder="Binance / Coinbase"
      />
    </div>
    <div className="w-full md:w-1/2">
      <label className="block text-sm font-medium text-color-light mb-2">Wallet Address</label>
      <input
        type="text"
        className="w-full border border-color-light rounded-lg px-3 py-2"
        placeholder="Wallet Address"
      />
    </div>
  </div>

  <button
    type="submit"
    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-8"
  >
    Save Wallet
  </button>
</form>

  )
}
