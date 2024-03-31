import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
const inter = Inter({ subsets: ["latin"] });
import Provider from "../components/Provider"
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
         <main className="max-w-4xl mx-auto p-4">
          <Provider >

          <Header />
        {children}

        <footer className="border-t p-8 text-center text-gray-500 mt-16">
                &copy; 2024 All rights reserved
              </footer>
          </Provider>
         </main>
        </body>
    </html>
  );
}
