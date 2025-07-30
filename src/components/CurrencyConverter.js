"use client";

import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'PLN', 'UAH', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/UAH`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.result === 'error') {
          throw new Error(data['error-type']);
        }
        // Add UAH to the rates list as the base currency
        data.conversion_rates.UAH = 1;
        setRates(data.conversion_rates);
        setError(null);
      } catch (e) {
        setError(`Failed to load exchange rates: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    if (rates) {
      const rateFrom = rates[fromCurrency];
      const rateTo = rates[toCurrency];
      const converted = (amount / rateFrom) * rateTo;
      setConvertedAmount(converted.toFixed(4));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty input and numbers
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setAmount(value);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading converter...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Currency Converter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="col-span-1">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
            <select
              id="from"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {currencies.map(currency => <option key={currency}>{currency}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
            <select
              id="to"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {currencies.map(currency => <option key={currency}>{currency}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">Converted Amount:</p>
          <p className="text-2xl font-bold text-indigo-600">{convertedAmount} {toCurrency}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
