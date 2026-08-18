interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-500">
        Search
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search grocery items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>
    </div>
  );
}

export default SearchBar;