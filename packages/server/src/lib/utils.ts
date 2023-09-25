import nodefetch, { RequestInit } from 'node-fetch';

export async function fetch<T>(url: string, opts?: RequestInit) {
  const res = await nodefetch(url, opts);

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json().catch(() => ({}));

  return data as T;
}
