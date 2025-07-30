
"use client";

import { useState, useEffect } from 'react';

const CurrencyList = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/UAH`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.result === 'error') {
          throw new Error(data['error-type']);
        }
        const filteredRates = {
          USD: data.conversion_rates.USD,
          EUR: data.conversion_rates.EUR,
          GBP: data.conversion_rates.GBP,
          PLN: data.conversion_rates.PLN,
        };
        setRates(filteredRates);
      } catch (e) {
        setError(`Failed to load exchange rates: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading exchange rates...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Exchange Rates</div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">Base Currency: UAH</p>
        <div className="mt-4">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rates && Object.entries(rates).map(([currency, rate]) => (
                <tr key={currency}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{currency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrencyList;
