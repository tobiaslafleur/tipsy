import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bottom-0 mt-10 w-full bg-header py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8 text-sm text-gray-200">
          <Link href="/policy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/tobiaslafleur"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="cursor-pointer text-gray-200" />
          </Link>
          <span className="text-sm text-gray-200">&copy; Tobias la Fleur</span>
        </div>
      </div>
    </footer>
  );
}
