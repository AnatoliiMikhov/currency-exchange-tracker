import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header";
import { ThemeProvider } from "@/components/ThemeProvider"; // Import ThemeProvider

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
});

export const metadata = {
  title: 'Currency Exchange Rate Tracker',
  description: 'Веб-додаток, який дозволяє користувачам переглядати актуальні курси обміну валют та виконувати конвертацію між ними.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning={true}>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
