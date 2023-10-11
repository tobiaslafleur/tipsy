import { FeedItem } from '~/app/(protected)/play/[id]/page';
import { tipsyFetch } from '~/lib/utils';

export async function getFeed(gameId: string) {
  return await tipsyFetch<FeedItem[]>(`/games/${gameId}/feed`, {
    method: 'GET',
  });
}
