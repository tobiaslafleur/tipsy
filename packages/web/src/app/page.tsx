const rules = [
  'Your lives will be linked. If your partner dies, you die.',
  'Trading is only allowed within the team.',
  'No AH or sending items/gold/consumeables from main.',
  'No asking for help.',
  'No grouping up with others.',
  'Addons like RestedXP are not allowed.',
  'Bonus objectives can only be completed once.',
  'If you or your partner dies, you both have to down your drinks before going again.',
  'Every time you level up, you drink.',
  'if you run away from a fight, drink.',
  'Whenever someone in the guild dies (teams count as one), drink.',
];

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold text-gray-200">Rules</h1>
      <ul className="flex list-decimal flex-col gap-2 text-gray-200">
        {rules.map(rule => (
          <li key={rule}>
            <p>{rule}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
