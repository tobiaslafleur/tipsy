import { getGames } from '~/app/(protected)/join-game/page';
import AddGame from '~/components/dashboard/addGame';
import DashboardGames from '~/components/dashboard/games';

async function Dashboard() {
  const initialGames = await getGames();

  return (
    <main className="min-h-full">
      <h1 className="text-2xl font-semibold text-gray-200">Dashboard</h1>
      <AddGame />
      <DashboardGames initialGames={initialGames} />
    </main>
  );
}

export default Dashboard;
