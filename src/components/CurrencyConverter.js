"use client";

import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'PLN', 'UAH', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'DKK'];

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
    if (rates && amount) {
      const rateFrom = rates[fromCurrency];
      const rateTo = rates[toCurrency];
      const converted = (amount / rateFrom) * rateTo;
      setConvertedAmount(converted.toFixed(4));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
      if (value === '') {
        setConvertedAmount(null);
      }
    }
  };

  const handleReverseCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading) {
    return <div className="text-center p-4 text-gray-700">Loading converter...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden md:max-w-2xl mt-8 transform transition duration-500 hover:scale-105">
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">Currency Converter</h3>
        {/* Grid layout for Amount, From, Reverse, To fields */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          {/* Amount Input */}
          <div className="col-span-1 mb-8"> {/* Додано mb-8 тут */}
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
            />
          </div>
          {/* From Currency Selector */}
          <div className="col-span-1 mb-6">
            <label
              htmlFor="from"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              From
            </label>
            <select
              id="from"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          {/* Reverse Button */}
          <div className="flex items-end justify-center">
            <button
              onClick={handleReverseCurrencies}
              className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition duration-200 hover:scale-110"
              aria-label="Reverse currencies"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>
          {/* To Currency Selector */}
          <div>
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              To
            </label>
            <select
              id="to"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">Converted Amount:</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {convertedAmount ? `${convertedAmount} ${toCurrency}` : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
