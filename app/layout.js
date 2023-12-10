import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "URL Shortener",
  description: "Shorten url",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative h-full w-full flex justify-center items-center">
          <div className="flex flex-col shadow-2xl p-4 w-[798px] mx-auto rounded-lg bg-white">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
