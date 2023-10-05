import MyGames from '~/components/games/games';

export default function Page() {
  return (
    <main className="min-h-full">
      <div className="">
        <h2 className="text-2xl font-semibold text-gray-200">My Games</h2>
      </div>
      <MyGames />
    </main>
  );
}
