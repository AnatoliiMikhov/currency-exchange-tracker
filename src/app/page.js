import CurrencyList from '@/components/CurrencyList';
import CurrencyConverter from '@/components/CurrencyConverter';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] py-2">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Актуальні Курси Валют</h2>

      <CurrencyList />

      <CurrencyConverter />
    </div>
  );
}
