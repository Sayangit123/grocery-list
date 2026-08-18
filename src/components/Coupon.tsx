interface CouponProps {
  coupon: string;
  setCoupon: (value: string) => void;
  applyCoupon: () => void;
  couponMessage: string;
  couponDiscount: number;
}

function Coupon({
  coupon,
  setCoupon,
  applyCoupon,
  couponMessage,
  couponDiscount,
}: CouponProps) {
  return (
    <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

      {/* TITLE */}
      <h3 className="text-sm font-bold text-slate-900">
        Have a coupon?
      </h3>

      {/* INPUT + BUTTON */}
      <div className="mt-3 flex">

        <input
          type="text"
          placeholder="Enter code"
          value={coupon}
          onChange={(e) =>
            setCoupon(e.target.value)
          }
          className="min-w-0 flex-1 rounded-l-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />

        <button
          onClick={applyCoupon}
          className="rounded-r-lg bg-green-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-green-800"
        >
          Apply
        </button>

      </div>

      {/* MESSAGE */}
      {couponMessage && (
        <p
          className={`mt-2 text-[11px] font-bold ${
            couponDiscount > 0
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {couponMessage}
        </p>
      )}

      {/* AVAILABLE COUPONS */}
      <p className="mt-2 text-[10px] text-slate-400">
        Try SAVE10 or SAVE20
      </p>

    </div>
  );
}

export default Coupon;