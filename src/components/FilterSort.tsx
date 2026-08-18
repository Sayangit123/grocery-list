interface FilterSortProps {
  category: string;
  setCategory: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  categories: string[];
}

function FilterSort({
  category,
  setCategory,
  sort,
  setSort,
  categories,
}: FilterSortProps) {
  return (
    <>
      {/* CATEGORY */}
      <div>
        <label className="mb-2 block text-xs font-bold text-slate-500">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-green-500"
        >
          {categories.map((itemCategory) => (
            <option key={itemCategory} value={itemCategory}>
              {itemCategory}
            </option>
          ))}
        </select>
      </div>

      {/* SORT */}
      <div>
        <label className="mb-2 block text-xs font-bold text-slate-500">
          Sort by Price
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-green-500"
        >
          <option value="default">Default</option>

          <option value="low-high">
            Price: Low to High
          </option>

          <option value="high-low">
            Price: High to Low
          </option>
        </select>
      </div>
    </>
  );
}

export default FilterSort;