import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from '~/components/header';

import Providers from '~/components/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Tipsy',
  description: 'Helyxia hardcore tipsy challenge',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
