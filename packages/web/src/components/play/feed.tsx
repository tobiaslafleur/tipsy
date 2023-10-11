'use client';

import { useQuery } from '@tanstack/react-query';
import { Wine } from 'lucide-react';
import Image from 'next/image';
import { FeedItem, getFeed } from '~/app/(protected)/play/[id]/page';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';

export default function Feed({
  initialFeed,
  gameId,
}: {
  initialFeed: FeedItem[];
  gameId: string;
}) {
  const { data: feed } = useQuery({
    queryKey: ['feed', gameId],
    queryFn: () => getFeed(gameId),
    initialData: initialFeed,
    refetchInterval: 1000 * 5,
  });

  return (
    <ScrollArea className="flex h-full max-h-[79vh] rounded-md bg-header p-4 text-gray-200 shadow">
      <div className="flex flex-col gap-6 rounded-md">
        {feed.length > 0 ? (
          feed.map(feedItem => (
            <div key={feedItem.id} className="rounded-md bg-foreground/40">
              <div className="relative h-40 w-full">
                <Image
                  fill
                  className="absolute object-cover"
                  src={`${String(process.env.BASE_URL)}/images/${
                    feedItem.image
                  }`}
                  alt={feedItem.title}
                />
              </div>
              <div className="flex flex-col px-3 py-2">
                <span className="truncate text-base font-semibold">
                  {feedItem.title}
                </span>
                <span className="truncate text-sm">{feedItem.team_name}</span>
                <span className="inline-flex items-center gap-1.5 truncate text-sm">
                  {feedItem.weight}x
                  <Wine className="h-4 w-4 stroke-red-600" />
                  {feedItem.selected_team_name}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="inline-flex justify-center">
            No tasks completed yet.
          </div>
        )}
      </div>
      <ScrollBar className="bg-gray-200/20 placeholder-green-800" />
    </ScrollArea>
  );
}
