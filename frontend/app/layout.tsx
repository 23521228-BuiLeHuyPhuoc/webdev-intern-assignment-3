import type { Metadata } from "next";
import {Toaster} from "sonner";
import { Geist, Geist_Mono, Rubik} from "next/font/google";
import "./globals.scss";
import "./taiwind.css";
import "dotenv/config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
const geistRubik= Rubik({
  variable:"--font-rubik",
  subsets:["latin"]
})

export const metadata: Metadata = {
  title: "Đây là trang chung",
  description: "Đây là trang dùng chung cho tất cả các trang con",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (

    <html
      lang="en"
      className={` ${geistRubik.variable} } h-full antialiased`}
    >
      

      <body className="font-rubik">
          <Toaster position="top-right" richColors />
        <Header/>
        <div className="flex min-h-[calc(100vh-76px)] flex-col md:flex-row">
          <Sidebar/>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <Footer/>
        </body>
      
    </html>
  );
}
