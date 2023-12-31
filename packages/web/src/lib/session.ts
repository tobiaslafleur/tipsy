import { cookies } from 'next/headers';

const useServerSession = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/discord/me`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cookies()
          .getAll()
          .map(cookie => `${cookie.name}=${cookie.value}`)
          .join('; '),
      },
    }
  );

  if (!res.ok) return null;

  return await res.json();
};

export default useServerSession;
