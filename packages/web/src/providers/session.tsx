'use client';

import { ReactNode, createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

type Session = {
  session: string;
  id: string;
  discord_id: string;
  name: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  role: string;
};

type SessionContext = {
  signOut: () => Promise<void>;
  session: Session | undefined;
};

const sessionContext = createContext<SessionContext>({
  signOut: async () => {},
  session: undefined,
});

const SessionContextProvider = ({
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
      `${process.env.BASE_URL}/api/v1/auth/discord/sign-out`,
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

export default SessionContextProvider;

export const useSession = () => useContext(sessionContext);
