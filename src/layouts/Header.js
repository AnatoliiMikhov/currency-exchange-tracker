"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Header() {
  return (
    // Оновлено: додано стилі для світлої теми (bg-white, text-gray-800)
    // та відповідні стилі для темної теми (dark:bg-gray-800, dark:text-white)
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 shadow-md w-full transition-colors duration-300">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2 sm:mb-0 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
          Currency Exchange Rate Tracker
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="flex space-x-4">
            <Link href="/" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              Головна
            </Link>
            <Link href="/news" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              Новини
            </Link>
            <Link href="/history" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              Історія
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
