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
    <section>
      {/* SECTION HEADING */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Grocery Items
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {items.length} items available
          </p>
        </div>
      </div>

      {/* NO RESULTS */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="text-4xl">
            🔍
          </div>

          <h3 className="mt-4 font-bold">
            No items found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try searching for another grocery item.
          </p>
        </div>
      ) : (
        /* PRODUCT GRID */
        <div className="grid gap-4 sm:grid-cols-2">
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