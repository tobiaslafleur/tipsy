import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Footer from '~/components/footer';
import Header from '~/components/header';
import Providers from '~/components/providers';
import { Toaster } from '~/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Tipsy',
  description: 'A place to host your drinking events',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex min-h-screen flex-col`}>
        <Providers>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
