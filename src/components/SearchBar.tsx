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

      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-green-700">
        Find groceries
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search apples, milk, rice..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="h-12 w-full rounded-xl border-2 border-green-100 bg-[#f9fbf5] pl-12 pr-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-50"
        />

      </div>
    </div>
  );
}

export default SearchBar;