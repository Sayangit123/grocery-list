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
        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-green-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="h-12 w-full cursor-pointer rounded-xl border-2 border-green-100 bg-[#f9fbf5] px-3 text-sm font-bold outline-none transition focus:border-green-600 focus:bg-white"
        >
          {categories.map((itemCategory) => (
            <option
              key={itemCategory}
              value={itemCategory}
            >
              {itemCategory}
            </option>
          ))}
        </select>
      </div>

      {/* SORT */}
      <div>
        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-green-700">
          Sort by Price
        </label>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="h-12 w-full cursor-pointer rounded-xl border-2 border-green-100 bg-[#f9fbf5] px-3 text-sm font-bold outline-none transition focus:border-green-600 focus:bg-white"
        >
          <option value="default">
            Default
          </option>

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