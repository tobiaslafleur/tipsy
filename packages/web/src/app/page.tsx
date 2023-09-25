'use client';

import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);

  async function handleClick(e: any) {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/v1/auth/discord/me', {
      method: 'GET',
      credentials: 'include',
    });

    setUser(await res.json());
  }

  return (
    <main className="flex gap-10">
      <a href="http://localhost:4000/api/v1/auth/discord/sign-in">
        Login with discord
      </a>
      <button onClick={handleClick}>Fetch me</button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
