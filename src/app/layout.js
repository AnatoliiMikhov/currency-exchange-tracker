import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Currency Exchange Rate Tracker',
  description: 'Веб-додаток, який дозволяє користувачам переглядати актуальні курси обміну валют та виконувати конвертацію між ними.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Додано: компонент шапки сайту (Header) */}
        <header className="bg-gray-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Currency Exchange Rate Tracker</h1>
            <nav>
              {/* Місце для посилань навігації */}
            </nav>
          </div>
        </header>

        {/* Додано: основний контейнер для вмісту сторінок (Main Content Area) */}
        <main className="container mx-auto p-4">
          {children}
        </main>

      </body>
    </html>
  );
}
