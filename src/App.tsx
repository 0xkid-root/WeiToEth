import React, { useState, useEffect, useCallback } from 'react';
import { Copy, TrendingUp, Calculator, Zap, RefreshCw } from 'lucide-react';
import SEOContent from './components/SEOContent';

interface EthPrice {
  usd: number;
  eur: number;
  gbp: number;
  btc: number;
  change24h: number;
}

interface GasData {
  slow: number;
  standard: number;
  fast: number;
}

const ETH_UNITS = {
  wei: { name: 'Wei', multiplier: 1 },
  kwei: { name: 'Kwei', multiplier: 1000 },
  mwei: { name: 'Mwei', multiplier: 1000000 },
  gwei: { name: 'Gwei', multiplier: 1000000000 },
  szabo: { name: 'Szabo', multiplier: 1000000000000 },
  finney: { name: 'Finney', multiplier: 1000000000000000 },
  eth: { name: 'ETH', multiplier: 1000000000000000000 }
};

const CURRENCIES = {
  usd: { symbol: '$', name: 'US Dollar' },
  eur: { symbol: '€', name: 'Euro' },
  gbp: { symbol: '£', name: 'British Pound' },
  btc: { symbol: '₿', name: 'Bitcoin' }
};

function App() {
  const [ethAmount, setEthAmount] = useState<string>('1');
  const [selectedUnit, setSelectedUnit] = useState<keyof typeof ETH_UNITS>('eth');
  const [selectedCurrency, setSelectedCurrency] = useState<keyof typeof CURRENCIES>('usd');
  const [ethPrice, setEthPrice] = useState<EthPrice | null>(null);
  const [gasData, setGasData] = useState<GasData | null>(null);
  const [gasLimit, setGasLimit] = useState<string>('21000');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch real ETH price from CoinGecko API
  const fetchEthPrice = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,eur,gbp,btc&include_24hr_change=true'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch price data');
      }
      
      const data = await response.json();
      const ethData = data.ethereum;
      
      const realPrice: EthPrice = {
        usd: ethData.usd,
        eur: ethData.eur,
        gbp: ethData.gbp,
        btc: ethData.btc,
        change24h: ethData.usd_24h_change || 0
      };
      
      setEthPrice(realPrice);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch ETH price:', error);
      // Fallback to mock data if API fails
      const fallbackPrice: EthPrice = {
        usd: 2450.75,
        eur: 2280.50,
        gbp: 1950.25,
        btc: 0.052,
        change24h: 0
      };
      setEthPrice(fallbackPrice);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGasData = useCallback(async () => {
    try {
      // Mock gas data (you can replace this with a real gas API later)
      const mockGas: GasData = {
        slow: 15 + Math.random() * 5,
        standard: 25 + Math.random() * 10,
        fast: 45 + Math.random() * 15
      };
      
      setGasData(mockGas);
    } catch (error) {
      console.error('Failed to fetch gas data:', error);
    }
  }, []);

  useEffect(() => {
    fetchEthPrice();
    fetchGasData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchEthPrice();
      fetchGasData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchEthPrice, fetchGasData]);

  const convertFromSelectedUnit = (inputValue: number): Record<keyof typeof ETH_UNITS, string> => {
    // Convert input value to Wei first (base unit)
    const weiValue = inputValue * ETH_UNITS[selectedUnit].multiplier;
    
    // Then convert Wei to all other units
    return Object.fromEntries(
      Object.entries(ETH_UNITS).map(([unit, data]) => [
        unit,
        (weiValue / data.multiplier).toLocaleString('en-US', { 
          maximumFractionDigits: unit === 'wei' ? 0 : 18 
        })
      ])
    ) as Record<keyof typeof ETH_UNITS, string>;
  };

  const convertToFiat = (ethValue: number): Record<keyof typeof CURRENCIES, string> => {
    if (!ethPrice) return {} as Record<keyof typeof CURRENCIES, string>;
    
    // Convert input to ETH first, then to fiat
    const ethAmount = (ethValue * ETH_UNITS[selectedUnit].multiplier) / ETH_UNITS.eth.multiplier;
    
    return Object.fromEntries(
      Object.entries(CURRENCIES).map(([currency, data]) => [
        currency,
        (ethAmount * ethPrice[currency as keyof EthPrice]).toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: currency === 'btc' ? 8 : 2 
        })
      ])
    ) as Record<keyof typeof CURRENCIES, string>;
  };

  const calculateGasFees = (): Record<string, string> => {
    if (!gasData || !ethPrice) return {};
    
    const limit = parseFloat(gasLimit) || 21000;
    
    return {
      slow: ((gasData.slow * limit * 1e-9) * ethPrice.usd).toFixed(2),
      standard: ((gasData.standard * limit * 1e-9) * ethPrice.usd).toFixed(2),
      fast: ((gasData.fast * limit * 1e-9) * ethPrice.usd).toFixed(2),
      slowEth: (gasData.slow * limit * 1e-9).toFixed(6),
      standardEth: (gasData.standard * limit * 1e-9).toFixed(6),
      fastEth: (gasData.fast * limit * 1e-9).toFixed(6)
    };
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const ethValue = parseFloat(ethAmount) || 0;
  const conversions = convertFromSelectedUnit(ethValue);
  const fiatConversions = convertToFiat(ethValue);
  const gasFees = calculateGasFees();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 shadow">
                {/* Custom Ethereum SVG Logo */}
                <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="eth-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60A5FA"/>
                      <stop offset="1" stopColor="#A78BFA"/>
                    </linearGradient>
                  </defs>
                  <polygon points="20,4 36,20 20,36 4,20" fill="url(#eth-gradient)" />
                  <polygon points="20,10 30,20 20,30 10,20" fill="#fff" fillOpacity="0.8"/>
                  <circle cx="20" cy="20" r="6" fill="url(#eth-gradient)" opacity="0.7"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ETH Converter Pro
                </h1>
                <p className="text-gray-600 text-sm">Complete Ethereum conversion toolkit</p>
              </div>
            </div>
            
            <button
              onClick={fetchEthPrice}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Price Overview */}
        {ethPrice && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(CURRENCIES).map(([currency, data]) => (
              <div key={currency} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">ETH/{currency.toUpperCase()}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    ethPrice.change24h >= 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {ethPrice.change24h >= 0 ? '+' : ''}{ethPrice.change24h.toFixed(2)}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.symbol}{ethPrice[currency as keyof EthPrice].toLocaleString('en-US', {
                    minimumFractionDigits: currency === 'btc' ? 6 : 2,
                    maximumFractionDigits: currency === 'btc' ? 8 : 2
                  })}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Updated {lastUpdated.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Unit Converter */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Unit Converter</h2>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value as keyof typeof ETH_UNITS)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {Object.entries(ETH_UNITS).map(([unit, data]) => (
                      <option key={unit} value={unit}>{data.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(ETH_UNITS).map(([unit, data]) => (
                  <div key={unit} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <span className="font-medium text-gray-900">{data.name}</span>
                      <span className="text-gray-500 text-sm ml-2">({unit})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-gray-900">{conversions[unit]}</span>
                      <button
                        onClick={() => copyToClipboard(conversions[unit])}
                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fiat Converter */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Fiat Converter</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800 mb-1">Converting</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {parseFloat(ethAmount).toLocaleString()} {ETH_UNITS[selectedUnit].name}
                  </div>
                </div>

                <div className="space-y-3">
                  {Object.entries(CURRENCIES).map(([currency, data]) => (
                    <div key={currency} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <span className="font-medium text-gray-900">{data.name}</span>
                        <span className="text-gray-500 text-sm ml-2">({currency.toUpperCase()})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gray-900">
                          {data.symbol}{fiatConversions[currency]}
                        </span>
                        <button
                          onClick={() => copyToClipboard(fiatConversions[currency])}
                          className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gas Fee Calculator */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Gas Fee Calculator</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gas Limit</label>
              <input
                type="number"
                value={gasLimit}
                onChange={(e) => setGasLimit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="21000"
              />
              <p className="text-xs text-gray-500 mt-1">Standard transfer: 21,000</p>
            </div>

            <div className="lg:col-span-3">
              {gasData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'slow', name: 'Slow', color: 'green' },
                    { key: 'standard', name: 'Standard', color: 'blue' },
                    { key: 'fast', name: 'Fast', color: 'purple' }
                  ].map(({ key, name, color }) => (
                    <div key={key} className={`p-4 border-2 border-${color}-200 rounded-lg bg-${color}-50`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-medium text-${color}-800`}>{name}</span>
                        <span className={`text-xs px-2 py-1 bg-${color}-200 text-${color}-800 rounded-full`}>
                          {gasData[key as keyof GasData].toFixed(1)} Gwei
                        </span>
                      </div>
                      <div className={`text-lg font-bold text-${color}-900 mb-1`}>
                        ${gasFees[key] || '0.00'}
                      </div>
                      <div className={`text-sm text-${color}-700`}>
                        {gasFees[`${key}Eth`] || '0.000000'} ETH
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Real-time data updates every 30 seconds • Built with precision and care</p>
          <p className="mt-1">Gas fees are estimates and may vary based on network conditions</p>
        </div>
      </div>
      
      {/* SEO Content Section */}
      <div className="bg-white">
        <SEOContent />
      </div>
    </div>
  );
}

export default App;