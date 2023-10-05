import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import useServerSession from '~/lib/session';

async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await useServerSession();

  if (session.role !== 'ADMIN') redirect('/');

  return session ? (
    <div className="container mx-auto flex h-full flex-1 flex-col">
      {children}
    </div>
  ) : null;
}

export default DashboardLayout;
