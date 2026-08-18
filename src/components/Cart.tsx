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
    <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

      {/* CART HEADER */}
      <div className="flex items-center justify-between bg-green-50 px-5 py-5">

        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] text-green-600">
            YOUR ORDER
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Shopping Cart
          </h2>
        </div>

        {/* CART COUNT */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
          {cart.length}
        </div>

      </div>

      {/* EMPTY CART */}
      {cart.length === 0 ? (

        <div className="px-6 py-12 text-center">

          <div className="text-4xl">
            🛒
          </div>

          <h3 className="mt-4 font-bold text-slate-900">
            Your cart is empty
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Add some groceries to start building
            your order.
          </p>

        </div>

      ) : (

        /* CART ITEMS */
        <div className="px-5">

          {cart.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between gap-3 border-b border-slate-100 py-4"
            >

              {/* ITEM INFORMATION */}
              <div>

                <h4 className="text-sm font-bold text-slate-900">
                  {item.name}
                </h4>

                <p className="mt-1 text-[11px] text-slate-400">
                  {item.category}
                </p>

              </div>

              {/* PRICE + REMOVE */}
              <div className="text-right">

                <p className="text-sm font-bold text-slate-900">
                  ₹{item.price}
                </p>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="mt-1 text-[11px] font-bold text-red-500 transition hover:text-red-700"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </aside>
  );
}

export default Cart;