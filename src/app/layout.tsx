import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Trovia.ng - Connect with Local Jobs',
  description: 'Trovia.ng connects Nigerian communities with local job opportunities, empowering artisans, workers, and residents.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}