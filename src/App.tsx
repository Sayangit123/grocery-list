import { useEffect, useState } from "react";

import { groceryItems } from "./data/groceryData";
import type { GroceryItem as GroceryItemType } from "./types/grocery";

import SearchBar from "./components/SearchBar";
import FilterSort from "./components/FilterSort";
import GroceryList from "./components/GroceryList";
import Cart from "./components/Cart";
import Discount from "./components/Discount";
import Coupon from "./components/Coupon";
import UndoButton from "./components/UndoButton";

function App() {
  const [cart, setCart] = useState<GroceryItemType[]>(() => {
    const savedCart = localStorage.getItem("grocery-cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [coupon, setCoupon] = useState(() => {
    return localStorage.getItem("grocery-coupon") || "";
  });

  const [couponDiscount, setCouponDiscount] = useState(() => {
    const savedDiscount = localStorage.getItem(
      "grocery-coupon-discount"
    );

    return savedDiscount ? Number(savedDiscount) : 0;
  });

  const [couponMessage, setCouponMessage] = useState("");
  const [previousCart, setPreviousCart] =
    useState<GroceryItemType[] | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "grocery-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("grocery-coupon", coupon);
  }, [coupon]);

  useEffect(() => {
    localStorage.setItem(
      "grocery-coupon-discount",
      couponDiscount.toString()
    );
  }, [couponDiscount]);

  const categories = [
    "All",
    ...new Set(
      groceryItems.map((item) => item.category)
    ),
  ];

  const filteredItems = groceryItems
    .filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((item) =>
      category === "All"
        ? true
        : item.category === category
    )
    .sort((a, b) => {
      if (sort === "low-high") {
        return a.price - b.price;
      }

      if (sort === "high-low") {
        return b.price - a.price;
      }

      return 0;
    });

  const addToCart = (item: GroceryItemType) => {
    setCart((currentCart) => {
      const alreadyExists = currentCart.some(
        (cartItem) => cartItem.id === item.id
      );

      if (alreadyExists) {
        return currentCart;
      }

      setPreviousCart(currentCart);

      return [...currentCart, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((currentCart) => {
      setPreviousCart(currentCart);

      return currentCart.filter(
        (item) => item.id !== id
      );
    });
  };

  const undoLastAction = () => {
    if (previousCart === null) {
      return;
    }

    setCart(previousCart);
    setPreviousCart(null);
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    setCoupon(code);

    if (code === "SAVE10") {
      setCouponDiscount(10);
      setCouponMessage(
        "SAVE10 applied successfully!"
      );
    } else if (code === "SAVE20") {
      setCouponDiscount(20);
      setCouponMessage(
        "SAVE20 applied successfully!"
      );
    } else {
      setCouponDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  const discountPercentage =
    totalPrice >= 500 ? 10 : 0;

  const discountAmount =
    (totalPrice * discountPercentage) / 100;

  const discountedTotal =
    totalPrice - discountAmount;

  const couponAmount =
    (discountedTotal * couponDiscount) / 100;

  const finalTotal =
    discountedTotal - couponAmount;

  return (
    <div className="min-h-screen bg-[#f7f8f1] text-slate-900">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-green-100 bg-[#fbfcf5]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 rotate-[-3deg] items-center justify-center rounded-2xl border-2 border-green-700 bg-[#dff2cf] text-2xl shadow-[3px_3px_0px_#166534]">
              🛒
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-green-900 sm:text-2xl">
                FreshCart
              </h1>

              <p className="hidden text-[10px] font-semibold text-green-700 sm:block">
                Fresh groceries, happy living
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
            <a
              href="#shop"
              className="transition hover:text-green-700"
            >
              Shop
            </a>

            <a
              href="#categories"
              className="transition hover:text-green-700"
            >
              Categories
            </a>

            <a
              href="#cart"
              className="transition hover:text-green-700"
            >
              Cart
            </a>
          </nav>

          <div className="flex items-center gap-2 rounded-full border-2 border-green-700 bg-white px-4 py-2 text-sm font-black text-green-800 shadow-[2px_2px_0px_#166534]">
            🛍️
            <span>{cart.length}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">

        {/* HERO */}
        <section className="relative mb-8 overflow-hidden rounded-[2rem] border-2 border-green-800 bg-[#dff2cf] px-6 py-8 shadow-[5px_5px_0px_#166534] sm:px-10 sm:py-10">

          <div className="relative z-10 max-w-2xl">

            <span className="inline-flex rotate-[-2deg] rounded-full border-2 border-green-800 bg-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-green-800">
              Fresh & Healthy
            </span>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-green-950 sm:text-5xl lg:text-6xl">
              Build Your
              <br />
              <span className="text-green-700">
                Grocery List
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm font-medium leading-6 text-green-900/70 sm:text-base">
              Pick your favorite fresh groceries,
              add them to your cart and enjoy a
              simple shopping experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-full border-2 border-green-900 bg-green-800 px-6 py-3 text-sm font-black text-white shadow-[3px_3px_0px_#14532d] transition hover:-translate-y-0.5"
              >
                Start Shopping →
              </a>

              <div className="flex items-center rounded-full border-2 border-green-800 bg-white px-4 py-2 text-xs font-bold text-green-800">
                🌱 Fresh every day
              </div>
            </div>
          </div>

          {/* DECORATION */}
          <div className="absolute -right-8 -top-10 hidden rotate-12 text-[9rem] opacity-90 sm:block">
            🥬
          </div>

          <div className="absolute bottom-[-25px] right-20 hidden rotate-[-15deg] text-7xl sm:block">
            🥕
          </div>

          <div className="absolute bottom-3 right-8 hidden rotate-12 text-5xl sm:block">
            🍎
          </div>

          <div className="absolute right-8 top-8 text-2xl">
            ✦
          </div>

          <div className="absolute right-28 top-20 text-xl">
            ✦
          </div>
        </section>

        {/* SEARCH + FILTER */}
        <section
          id="shop"
          className="mb-8 rounded-[1.5rem] border-2 border-green-100 bg-white p-4 shadow-[3px_3px_0px_#d9ead0]"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_190px_210px]">

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <FilterSort
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              categories={categories}
            />

          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.65fr_0.9fr]">

          <GroceryList
            items={filteredItems}
            cart={cart}
            addToCart={addToCart}
          />

          <div
            id="cart"
            className="lg:sticky lg:top-24"
          >

            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
            />

            {cart.length > 0 && (
              <UndoButton
                undoLastAction={undoLastAction}
                disabled={previousCart === null}
              />
            )}

            {cart.length > 0 && (
              <div className="mt-5 rounded-[1.5rem] border-2 border-green-800 bg-white p-5 shadow-[4px_4px_0px_#166534]">

                <Discount
                  totalPrice={totalPrice}
                  discountPercentage={
                    discountPercentage
                  }
                  discountAmount={discountAmount}
                  discountedTotal={discountedTotal}
                />

                <Coupon
                  coupon={coupon}
                  setCoupon={setCoupon}
                  applyCoupon={applyCoupon}
                  couponMessage={couponMessage}
                  couponDiscount={couponDiscount}
                />

                {couponDiscount > 0 && (
                  <div className="mt-4 flex justify-between rounded-xl bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
                    <span>
                      Coupon ({couponDiscount}%)
                    </span>

                    <strong>
                      -₹{couponAmount}
                    </strong>
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between border-t-2 border-dashed border-green-100 pt-5">
                  <span className="text-lg font-black text-slate-800">
                    Total
                  </span>

                  <strong className="text-3xl font-black text-green-700">
                    ₹{finalTotal}
                  </strong>
                </div>

                <div className="mt-3 rounded-xl bg-[#e5f6d8] px-3 py-3 text-center text-xs font-black text-green-800">
                  🎉 You're saving ₹
                  {discountAmount + couponAmount}
                </div>

                <button className="mt-4 w-full rounded-xl border-2 border-green-900 bg-green-800 py-3 text-sm font-black text-white shadow-[3px_3px_0px_#14532d] transition hover:-translate-y-0.5">
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t-2 border-green-100 bg-white px-5 py-8 text-center">
        <div className="text-xl">
          🥕 🍎 🥬 🍌
        </div>

        <p className="mt-3 text-xs font-bold text-green-800">
          FreshCart • Fresh groceries, simple shopping
        </p>

        <p className="mt-1 text-[10px] text-slate-400">
          Eat fresh. Shop simple. Live happy.
        </p>
      </footer>
    </div>
  );
}

export default App;