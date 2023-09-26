'use client';

import { ReactNode, createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

type Session = {
  session: string;
  id: string;
  discord_id: string;
  name: string;
  avatar: string;
};

type SessionContext = {
  signOut: () => Promise<void>;
  session: Session | undefined;
};

const sessionContext = createContext<SessionContext>({
  signOut: async () => {},
  session: undefined,
});

const SessionContexProvider = ({
  children,
  session: initialSession,
}: {
  children: ReactNode;
  session?: Session;
}) => {
  const router = useRouter();

  const [session, setSession] = useState(initialSession);

  const signOut = async () => {
    const res = await fetch(
      'http://localhost:4000/api/v1/auth/discord/sign-out',
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    if (!res.ok) {
      return;
    }

    setSession(undefined);

    router.push('/');
  };

  return (
    <sessionContext.Provider value={{ signOut, session }}>
      {children}
    </sessionContext.Provider>
  );
};

export default SessionContexProvider;

export const useSession = () => useContext(sessionContext);
