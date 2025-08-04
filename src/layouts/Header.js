"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 shadow-md w-full transition-colors duration-300">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2 sm:mb-0 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700"
        >
          Currency Exchange Rate Tracker
        </Link>
        
        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-2">
            <Link 
              href="/" 
              className="text-gray-500 dark:text-gray-300 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700"
            >
              Головна
            </Link>
            <Link 
              href="/news" 
              className="text-gray-500 dark:text-gray-300 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700"
            >
              Новини
            </Link>
            <Link 
              href="/history" 
              className="text-gray-500 dark:text-gray-300 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700"
            >
              Історія
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
