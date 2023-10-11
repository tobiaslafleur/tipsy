'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { useSession } from '~/providers/session';

const links = [
  { title: 'My Games', href: '/games' },
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
    <header className="sticky top-0 z-50 mb-10 h-20 w-full bg-header bg-opacity-20 shadow-sm backdrop-blur-md">
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
                {session.role === 'ADMIN' ? (
                  <li>
                    <Link
                      href="/dashboard"
                      className={`bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-sm font-semibold uppercase tracking-widest transition-all hover:text-primary ${
                        pathname === '/dashboard'
                          ? '!text-transparent'
                          : 'text-gray-200'
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : null}
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
                  <AvatarFallback className="select-none bg-purple-700 text-lg font-semibold uppercase text-gray-200 shadow-sm">
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
              href={`${process.env.BASE_URL}/api/v1/auth/discord/sign-in`}
              className="inline-flex items-center rounded-md bg-[#5865F2] px-4 py-2 text-sm font-semibold tracking-wider text-gray-200 shadow transition hover:bg-[#4855e0] focus:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            >
              <svg
                className="mr-2 h-6 w-6 fill-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="0 -28.5 256 256"
                version="1.1"
                preserveAspectRatio="xMidYMid"
              >
                <g>
                  <path
                    d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                    fillRule="nonzero"
                  ></path>
                </g>
              </svg>
              Sign in with Discord
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
