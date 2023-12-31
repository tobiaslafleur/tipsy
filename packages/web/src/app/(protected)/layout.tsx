import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import useServerSession from '~/lib/session';

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const session = await useServerSession();

  if (!session) redirect('/');

  return session ? (
    <div className="container mx-auto flex h-full flex-1 flex-col">
      {children}
    </div>
  ) : null;
};

export default ProtectedLayout;
