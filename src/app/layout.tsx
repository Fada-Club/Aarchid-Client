import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoidContextProvider from "@/context/RecoidContextProvider";
import { CustomToaster } from "@/components/common/CustomToast";
import DataLoader from "@/components/common/DataLoader";
import { getCookies } from "@/actions/user/cookiers";
import { redirect } from "next/navigation";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aarchid",
  description: "Individual Level Flora Monitoring System ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoidContextProvider>
          {/* <DataLoader/> */}
          {children}
          <CustomToaster/>
        </RecoidContextProvider>
      </body>
    </html>
  );
}
