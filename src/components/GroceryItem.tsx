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

  const productVisual =
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
    <article className="group overflow-hidden rounded-[1.5rem] border-2 border-green-100 bg-white shadow-[3px_3px_0px_#dcebd5] transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-[5px_5px_0px_#b7d8a8]">

      {/* PRODUCT IMAGE AREA */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#f1f7e9]">

        <div className="absolute left-4 top-4 rounded-full border border-green-200 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-wider text-green-700">
          {item.category}
        </div>

        <div className="absolute right-5 top-5 text-sm text-green-300">
          ✦
        </div>

        <div className="absolute bottom-5 left-8 text-xs text-green-300">
          ✦
        </div>

        <div className="text-8xl drop-shadow-sm transition duration-300 group-hover:scale-110">
          {productVisual}
        </div>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="p-5">

        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-green-600">
          Fresh pick
        </p>

        <h3 className="mt-1 text-xl font-black text-slate-900">
          {item.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-black text-green-700">
            ₹{item.price}
          </p>

          <span className="rounded-full bg-green-50 px-2 py-1 text-[9px] font-bold text-green-700">
            ✓ Fresh
          </span>
        </div>

        <button
          onClick={() => addToCart(item)}
          disabled={isInCart}
          className={`mt-4 w-full rounded-xl border-2 py-3 text-sm font-black transition ${
            isInCart
              ? "cursor-not-allowed border-green-200 bg-green-50 text-green-600"
              : "border-green-800 bg-green-700 text-white shadow-[2px_2px_0px_#14532d] hover:-translate-y-0.5 hover:bg-green-800"
          }`}
        >
          {isInCart
            ? "✓ Added to Cart"
            : "+ Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default GroceryItem;