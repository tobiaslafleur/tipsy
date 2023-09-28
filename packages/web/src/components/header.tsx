'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { buttonVariants } from '~/components/ui/button';
import { useSession } from '~/providers/session';

const links = [
  { title: 'Games', href: '/games' },
  { title: 'Join game', href: '/join-game' },
];

export default function Header() {
  const { session, signOut } = useSession();
  const pathname = usePathname();

  const [spinning, setSpinning] = useState(false);

  const avatarUrl = session?.avatar
    ? `https://cdn.discordapp.com/avatars/${session.discord_id}/${session.avatar}`
    : undefined;

  return (
    <header className="sticky top-0 h-20 w-full bg-header bg-opacity-20 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link
          href="/"
          className="flex flex-col text-2xl font-semibold uppercase text-gray-200 shadow md:text-3xl"
        >
          <span>Tipsy</span>
        </Link>
        <nav className="flex items-center">
          {session ? (
            <>
              <ul className="flex items-center gap-8 px-6">
                {links.map(link => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className={`bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-sm font-semibold uppercase tracking-widest transition-all hover:text-primary ${
                        link.href === pathname
                          ? '!text-transparent'
                          : 'text-gray-200'
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                <Link
                  href="#"
                  onClick={() => signOut()}
                  className="text-sm font-semibold uppercase tracking-widest text-gray-200 transition-all hover:text-primary"
                >
                  Sign out
                </Link>
              </ul>
              <div className="flex items-center gap-4">
                <Avatar
                  onClick={() => setSpinning(prev => !prev)}
                  className={`h-12 w-12 border-2 border-purple-700/80 ${
                    spinning ? 'animate-spin' : ''
                  }`}
                >
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="select-none bg-secondary text-lg font-semibold uppercase text-gray-200 shadow-sm">
                    {session?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-base font-semibold text-gray-200 ">
                  {session?.name}
                </span>
              </div>
            </>
          ) : (
            <Link
              href={`${process.env.BASE_URL}/auth/discord/sign-in`}
              className={buttonVariants({ variant: 'ghost' })}
            >
              Sign in with Discord
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
