import { getGames } from '~/app/(protected)/join-game/page';
import DashboardGames from '~/components/dashboard/games';
import { Button } from '~/components/ui/button';

async function Dashboard() {
  const initialGames = await getGames();

  return (
    <main className="min-h-full">
      <h1 className="text-2xl font-semibold text-gray-200">Dashboard</h1>
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-200">Games</h2>
        <Button className="text-gray-200">Create new Game</Button>
      </div>
      <DashboardGames initialGames={initialGames} />
    </main>
  );
}

export default Dashboard;
