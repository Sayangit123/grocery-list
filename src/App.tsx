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

  const [couponMessage, setCouponMessage] =
    useState("");


  const [previousCart, setPreviousCart] =
    useState<GroceryItemType[] | null>(null);


  useEffect(() => {
    localStorage.setItem(
      "grocery-cart",
      JSON.stringify(cart)
    );
  }, [cart]);


  useEffect(() => {
    localStorage.setItem(
      "grocery-coupon",
      coupon
    );
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
      groceryItems.map(
        (item) => item.category
      )
    ),
  ];


  const filteredItems = groceryItems
    .filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
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

  const addToCart = (
    item: GroceryItemType
  ) => {
    setCart((currentCart) => {
      const alreadyExists =
        currentCart.some(
          (cartItem) =>
            cartItem.id === item.id
        );

      if (alreadyExists) {
        return currentCart;
      }

      setPreviousCart(currentCart);

      return [
        ...currentCart,
        item,
      ];
    });
  };

  const removeFromCart = (
    id: number
  ) => {
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
    const code =
      coupon.trim().toUpperCase();

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

      setCouponMessage(
        "Invalid coupon code."
      );
    }
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price,
    0
  );

  const discountPercentage =
    totalPrice >= 500 ? 10 : 0;

  const discountAmount =
    (totalPrice *
      discountPercentage) /
    100;

  const discountedTotal =
    totalPrice - discountAmount;

  
  const couponAmount =
    (discountedTotal *
      couponDiscount) /
    100;

  
  const finalTotal =
    discountedTotal -
    couponAmount;


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <header className="bg-green-700 text-white shadow-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl">
              🛒
            </div>

            <div>

              <h1 className="text-2xl font-extrabold">
                FreshCart
              </h1>

              <p className="text-xs text-green-100">
                Fresh groceries, simple shopping
              </p>

            </div>

          </div>

          {/* CART COUNT */}
          <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
            🛍️ {cart.length}{" "}
            {cart.length === 1
              ? "Item"
              : "Items"}
          </div>

        </div>

      </header>


      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* INTRO */}
        <section className="mb-8">

          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-green-600">
            GROCERY STORE
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Build Your Grocery List
          </h2>

          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Choose your favorite groceries and build
            your cart with ease.
          </p>

        </section>


        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="grid gap-4 lg:grid-cols-[1fr_180px_210px]">

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


        <div className="grid items-start gap-7 lg:grid-cols-[1.6fr_0.9fr]">

          {/* GROCERY LIST */}

          <GroceryList
            items={filteredItems}
            cart={cart}
            addToCart={addToCart}
          />

          {/* RIGHT SIDE */}

          <div>

            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
            />

            {cart.length > 0 && (

              <UndoButton
                undoLastAction={
                  undoLastAction
                }
                disabled={
                  previousCart === null
                }
              />

            )}

            {cart.length > 0 && (

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">

                {/* DISCOUNT */}

                <Discount
                  totalPrice={totalPrice}
                  discountPercentage={
                    discountPercentage
                  }
                  discountAmount={
                    discountAmount
                  }
                  discountedTotal={
                    discountedTotal
                  }
                />

                {/* COUPON */}

                <Coupon
                  coupon={coupon}
                  setCoupon={setCoupon}
                  applyCoupon={applyCoupon}
                  couponMessage={
                    couponMessage
                  }
                  couponDiscount={
                    couponDiscount
                  }
                />

                {/* COUPON DISCOUNT */}

                {couponDiscount >
                  0 && (

                  <div className="mt-4 flex justify-between text-sm text-green-600">

                    <span>
                      Coupon (
                      {
                        couponDiscount
                      }%)
                    </span>

                    <strong>
                      -₹
                      {
                        couponAmount
                      }
                    </strong>

                  </div>

                )}

                {/* FINAL TOTAL */}

                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">

                  <span className="text-lg font-extrabold">
                    Total
                  </span>

                  <strong className="text-2xl font-extrabold text-green-700">
                    ₹
                    {
                      finalTotal
                    }
                  </strong>

                </div>

                {/* SAVINGS */}

                <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-bold text-green-700">
                  🎉 You're saving ₹
                  {
                    discountAmount +
                    couponAmount
                  }
                </div>

              </div>

            )}

          </div>

        </div>

      </main>


      <footer className="border-t border-slate-200 bg-white py-6 text-center">

        <p className="text-xs text-slate-400">
          FreshCart • Grocery Item List
        </p>

      </footer>

    </div>
  );
}

export default App;