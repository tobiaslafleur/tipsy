import Feed from '~/components/play/feed';
import Tasks from '~/components/play/tasks';
import { tipsyFetch } from '~/lib/utils';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const feed = await getFeed(id);

  return (
    <main className="flex flex-1 gap-4">
      <div className="flex w-full flex-col">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-200">
            Your team's tasks
          </h2>
          <span className="text-sm text-gray-400">
            (Click the task to complete it)
          </span>
        </div>
        <Tasks gameId={id} />
      </div>
      <aside className="w-1/3 ">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-200">Feed</h2>
          <span className="text-sm text-gray-400">(Live updates)</span>
        </div>
        <Feed initialFeed={feed} gameId={id} />
      </aside>
    </main>
  );
}

export async function getFeed(gameId: string) {
  return await tipsyFetch<FeedItem[]>(`/games/${gameId}/feed`, {
    method: 'GET',
  });
}

export type FeedItem = {
  id: string;
  title: string;
  team_name: string;
  image: string;
  selected_team_name: string;
  weight: number;
  completed: boolean;
  completed_at: Date;
};
