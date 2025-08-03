"use client";

import Link from "next/link";

export default function Header() {
  return (
    // Шапка сайту з адаптивними стилями Tailwind CSS
    <header className="bg-gray-800 text-white p-4 shadow-md w-full">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Назва додатку як посилання на головну сторінку */}
        <Link href="/" className="text-2xl font-bold text-gray-400 mb-2 sm:mb-0 hover:text-white transition-colors duration-200">
          Currency Exchange Rate Tracker
        </Link>

        {/* Навігація з заглушками */}
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
            Головна
          </Link>
          <Link href="/news" className="text-gray-300 hover:text-white transition-colors duration-200">
            Новини
          </Link>
          <Link href="/history" className="text-gray-300 hover:text-white transition-colors duration-200">
            Історія
          </Link>
          {/* Тут можна додати інші посилання */}
        </nav>
      </div>
    </header>
  );
}