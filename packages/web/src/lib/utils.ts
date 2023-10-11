import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function tipsyFetch<T>(url: string, opts?: RequestInit) {
  const queryUrl = `${process.env.BASE_URL}/api/v1${url}`;

  const res = await fetch(queryUrl, opts);

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json().catch(() => ({}));

  return data as T;
}

export const sleep = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));
