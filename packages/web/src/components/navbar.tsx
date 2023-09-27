'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from '~/providers/session';

const links = [
  { href: '/', label: 'Play' },
  { href: '/games', label: 'Games' },
];

export default function Navbar() {
  const { session, signOut } = useSession();
  const [rotating, setRotating] = useState(false);

  return (
    <div className="w-full shadow-sm bg-[#292929]">
      <div className="container mx-auto py-4">
        <nav className="flex items-center justify-between">
          <div className="flex flex-1">
            <Link href="/">
              <h1 className="text-4xl font-semibold uppercase text-[#FF700A]">
                Tipsy HC
              </h1>
              <p className="text-left px-1 text-base font-semibold uppercase text-gray-200">
                Helyxia
              </p>
            </Link>
          </div>
          {session ? (
            <>
              <ul className="flex gap-8 items-center">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-base font-medium text-gray-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex gap-8 items-center flex-1 justify-end">
                <div className="flex items-center gap-4">
                  <p className="text-base font-medium text-gray-200">
                    {!rotating ? session.name : "I'm dizzy..."}
                  </p>
                  <Image
                    src={
                      session.avatar
                        ? `https://cdn.discordapp.com/avatars/${session.discord_id}/${session.avatar}`
                        : 'https://cdn.discordapp.com/embed/avatars/1.png'
                    }
                    alt="avatar"
                    width={40}
                    height={40}
                    className={`rounded-full shadow ${
                      rotating ? 'animate-spin' : null
                    } transition-transform cursor-pointer select-none`}
                    onClick={() => setRotating((prev) => !prev)}
                  />
                </div>
                <button
                  onClick={signOut}
                  className="text-base font-medium text-[#FF700A] border-2 border-[#FF700A] px-4 py-2 rounded-md hover:text-[#292929] hover:bg-[#FF700A] transition-colors"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <Link
              href="http://localhost:4000/api/v1/auth/discord/sign-in"
              className="flex items-center bg-gray-200 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-semibold text-darkbg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <svg
                className="h-6 w-6 mr-2"
                width="800px"
                height="800px"
                viewBox="0 -28.5 256 256"
                version="1.1"
                preserveAspectRatio="xMidYMid"
              >
                <g>
                  <path
                    d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                    fill="#5865F2"
                    fillRule="nonzero"
                  ></path>
                </g>
              </svg>

              <span>Sign in with Discord</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
