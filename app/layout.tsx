import { Nunito } from "next/font/google";

import "./globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import ToasterProvider from "./providers/ToasterProvider";

import Navbar from "./components/navbar/Navbar";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

export const metadata = {
  title: "Airbnb",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Actions
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <RentModal />
        <LoginModal />
        <RegisterModal />

        <Navbar currentUser={currentUser} />

        {children}
      </body>
    </html>
  );
}
