import type { GroceryItem as GroceryItemType } from "../types/grocery";

interface GroceryItemProps {
  item: GroceryItemType;
  isInCart: boolean;
  addToCart: (item: GroceryItemType) => void;
}

function GroceryItem({
  item,
  isInCart,
  addToCart,
}: GroceryItemProps) {
  // PRODUCT-SPECIFIC ICON
  const icon =
    item.name === "Apple"
      ? "🍎"
      : item.name === "Banana"
      ? "🍌"
      : item.name === "Milk"
      ? "🥛"
      : item.name === "Bread"
      ? "🍞"
      : item.name === "Eggs"
      ? "🥚"
      : item.name === "Rice"
      ? "🍚"
      : item.name === "Potato"
      ? "🥔"
      : item.name === "Tomato"
      ? "🍅"
      : "🛒";

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">

      {/* PRODUCT ICON */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
        {icon}
      </div>

      {/* CATEGORY */}
      <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
        {item.category}
      </span>

      {/* NAME */}
      <h3 className="mt-3 text-lg font-bold">
        {item.name}
      </h3>

      {/* PRICE */}
      <p className="mt-1 text-lg font-extrabold text-green-700">
        ₹{item.price}
      </p>

      {/* ADD BUTTON */}
      <button
        onClick={() => addToCart(item)}
        disabled={isInCart}
        className={`mt-5 w-full rounded-lg px-4 py-2.5 text-sm font-bold transition ${
          isInCart
            ? "cursor-not-allowed bg-green-100 text-green-700"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {isInCart
          ? "✓ Added to Cart"
          : "+ Add to Cart"}
      </button>

    </article>
  );
}

export default GroceryItem;