import type { GroceryItem as GroceryItemType } from "../types/grocery";

interface CartProps {
  cart: GroceryItemType[];
  removeFromCart: (id: number) => void;
}

function Cart({
  cart,
  removeFromCart,
}: CartProps) {
  return (
    <aside className="overflow-hidden rounded-[1.5rem] border-2 border-green-800 bg-white shadow-[4px_4px_0px_#166534]">

      {/* HEADER */}
      <div className="border-b-2 border-green-100 bg-[#e5f6d8] px-5 py-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-green-700">
              Your basket
            </p>

            <h2 className="mt-1 text-xl font-black text-green-950">
              Shopping Cart
            </h2>
          </div>

          <div className="flex h-10 w-10 rotate-3 items-center justify-center rounded-full border-2 border-green-800 bg-white text-sm font-black text-green-800">
            {cart.length}
          </div>

        </div>
      </div>

      {/* EMPTY */}
      {cart.length === 0 ? (
        <div className="px-6 py-12 text-center">

          <div className="text-5xl">
            🛒
          </div>

          <h3 className="mt-4 font-black text-slate-900">
            Your cart is empty
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Add some fresh groceries to start
            building your order.
          </p>

        </div>
      ) : (

        <div className="px-5">

          {cart.map((item) => {

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
              <div
                key={item.id}
                className="flex items-center gap-3 border-b border-dashed border-green-100 py-4 last:border-b-0"
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f7e9] text-2xl">
                  {icon}
                </div>

                <div className="min-w-0 flex-1">

                  <h4 className="truncate text-sm font-black text-slate-900">
                    {item.name}
                  </h4>

                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                    {item.category}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm font-black text-green-700">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="mt-1 text-[10px] font-bold text-red-400 transition hover:text-red-600"
                  >
                    Remove
                  </button>

                </div>
              </div>
            );
          })}

        </div>
      )}
    </aside>
  );
}

export default Cart;