import React from 'react';

const SEOContent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          What is an Ethereum (ETH) Converter?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          An Ethereum converter is an essential tool for anyone working with the Ethereum blockchain. 
          It allows you to convert between different Ethereum units like Wei, Gwei, Finney, and ETH, 
          as well as convert ETH to fiat currencies like USD, EUR, and GBP using real-time market prices.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our ETH Converter Pro provides accurate, real-time conversions with live price data from 
          CoinGecko API, making it the most reliable tool for Ethereum calculations and gas fee estimations.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Understanding Ethereum Units
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Wei</h3>
            <p className="text-blue-800">
              The smallest unit of Ethereum. 1 ETH = 1,000,000,000,000,000,000 Wei (10^18 Wei).
              Named after Wei Dai, a computer scientist and cryptographer.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 mb-3">Gwei</h3>
            <p className="text-green-800">
              Commonly used for gas prices. 1 Gwei = 1,000,000,000 Wei (10^9 Wei).
              Short for "Giga-wei", it's the standard unit for measuring gas fees.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 mb-3">Finney</h3>
            <p className="text-purple-800">
              1 Finney = 1,000,000,000,000,000 Wei (10^15 Wei).
              Named after Hal Finney, an early Bitcoin contributor and cryptographic pioneer.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-900 mb-3">ETH</h3>
            <p className="text-indigo-800">
              The main unit of Ethereum. Used for transactions, smart contracts, and as a store of value.
              1 ETH is the standard denomination for the Ethereum cryptocurrency.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How to Use the ETH Converter
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <strong>Enter Amount:</strong> Input the amount you want to convert in the amount field.
          </li>
          <li>
            <strong>Select Unit:</strong> Choose the source unit (Wei, Gwei, Finney, or ETH) from the dropdown.
          </li>
          <li>
            <strong>View Conversions:</strong> Instantly see conversions to all other Ethereum units.
          </li>
          <li>
            <strong>Check Fiat Prices:</strong> View real-time conversions to USD, EUR, GBP, and BTC.
          </li>
          <li>
            <strong>Calculate Gas Fees:</strong> Use the gas calculator to estimate transaction costs.
          </li>
          <li>
            <strong>Copy Values:</strong> Click the copy button next to any value to copy it to your clipboard.
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Gas Fee Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our integrated gas fee calculator helps you estimate the cost of Ethereum transactions. 
          Gas fees vary based on network congestion and transaction complexity. The calculator provides 
          three speed options:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Slow:</strong> Lower gas price, longer confirmation time</li>
          <li><strong>Standard:</strong> Average gas price, moderate confirmation time</li>
          <li><strong>Fast:</strong> Higher gas price, faster confirmation time</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              How many Wei are in 1 ETH?
            </h3>
            <p className="text-gray-700">
              1 ETH equals 1,000,000,000,000,000,000 Wei (1 followed by 18 zeros, or 10^18 Wei).
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              What is Gwei used for?
            </h3>
            <p className="text-gray-700">
              Gwei is primarily used to measure gas prices on the Ethereum network. When you send a 
              transaction, you specify the gas price in Gwei.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              How often are prices updated?
            </h3>
            <p className="text-gray-700">
              Our converter updates ETH prices every 30 seconds using the CoinGecko API to ensure 
              you always have the most current market data.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Is this converter free to use?
            </h3>
            <p className="text-gray-700">
              Yes, ETH Converter Pro is completely free to use. No registration required, no limits 
              on conversions, and no hidden fees.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-12 border-t pt-6 text-center text-gray-600">
        <p>
          Created by{' '}
          <a
            href="https://github.com/0xkid-root"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            0xkid-root
          </a>
          . Explore more projects on{' '}
          <a
            href="https://github.com/0xkid-root"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </a>
           
        </p>
      </footer>
    </div>
  );
};

export default SEOContent;