import type { GroceryItem as GroceryItemType } from "../types/grocery";
import GroceryItem from "./GroceryItem";

interface GroceryListProps {
  items: GroceryItemType[];
  cart: GroceryItemType[];
  addToCart: (item: GroceryItemType) => void;
}

function GroceryList({
  items,
  cart,
  addToCart,
}: GroceryListProps) {
  return (
    <section id="categories">

      {/* HEADING */}
      <div className="mb-5 flex items-end justify-between">

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">
            Our selection
          </p>

          <h2 className="mt-1 text-2xl font-black text-green-950">
            Grocery Items
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {items.length} fresh items available
          </p>
        </div>

        <div className="hidden rounded-full border-2 border-green-200 bg-white px-4 py-2 text-xs font-bold text-green-700 sm:block">
          🌱 Fresh picks
        </div>
      </div>

      {/* NO RESULTS */}
      {items.length === 0 ? (
        <div className="rounded-[1.5rem] border-2 border-dashed border-green-200 bg-white p-12 text-center">
          <div className="text-5xl">
            🔍
          </div>

          <h3 className="mt-4 text-lg font-black">
            No items found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try searching for another grocery item.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <GroceryItem
              key={item.id}
              item={item}
              isInCart={cart.some(
                (cartItem) =>
                  cartItem.id === item.id
              )}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default GroceryList;