import { Roboto } from "next/font/google"; // Імпортуємо шрифт Roboto
import "./globals.css";
import Header from "@/layouts/Header";

// Визначаємо шрифт Roboto
const roboto = Roboto({
  weight: ['300', '400', '500', '700'], // Вибираємо потрібні ваги шрифту
  subsets: ["latin", "cyrillic"], // Додаємо кирилицю для української мови
  variable: "--font-roboto", // Визначаємо CSS-змінну для шрифту
});

export const metadata = {
  title: 'Currency Exchange Rate Tracker',
  description: 'Веб-додаток, який дозволяє користувачам переглядати актуальні курси обміну валют та виконувати конвертацію між ними.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      {/* Застосовуємо шрифт Roboto до body */}
      <body className={`${roboto.variable} font-sans antialiased`}>
        <Header />

        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}