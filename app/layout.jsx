import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Todo App",
  description: "Todo 앱 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-[family-name:var(--font-inter)]">
        <Header />
        {children}
      </body>
    </html>
  );
}
