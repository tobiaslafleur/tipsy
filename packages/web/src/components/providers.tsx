import { ReactNode } from 'react';

import useServerSession from '~/lib/session';
import QueryContextProvider from '~/providers/query';
import SessionContextProvider from '~/providers/session';

export default async function Providers({ children }: { children: ReactNode }) {
  const session = await useServerSession();

  return (
    <QueryContextProvider>
      <SessionContextProvider session={session}>
        {children}
      </SessionContextProvider>
    </QueryContextProvider>
  );
}
