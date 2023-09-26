import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import useServerSession from '~/lib/session';

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const session = await useServerSession();

  if (!session) redirect('/');

  return session ? (
    <main className="container mx-auto mt-4">{children}</main>
  ) : null;
};

export default ProtectedLayout;
