export async function tipsyFetch<T>(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json().catch(() => ({}));

  return data as T;
}
