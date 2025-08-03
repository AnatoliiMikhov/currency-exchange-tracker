import CurrencyList from '@/components/CurrencyList';
import CurrencyConverter from '@/components/CurrencyConverter';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start py-8">

      <CurrencyList />

      <CurrencyConverter />
    </div>
  );
}
