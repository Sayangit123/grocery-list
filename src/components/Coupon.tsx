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
    <div className="mt-5 rounded-xl border-2 border-dashed border-green-200 bg-[#f7faef] p-4">

      <div className="flex items-center justify-between">

        <h3 className="text-sm font-black text-slate-900">
          🎟️ Have a coupon?
        </h3>

        <span className="text-[9px] font-bold text-green-600">
          SAVE & EARN
        </span>

      </div>

      <div className="mt-3 flex">

        <input
          type="text"
          placeholder="Enter code"
          value={coupon}
          onChange={(e) =>
            setCoupon(e.target.value)
          }
          className="min-w-0 flex-1 rounded-l-lg border-2 border-green-100 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-green-500"
        />

        <button
          onClick={applyCoupon}
          className="rounded-r-lg border-2 border-green-800 bg-green-700 px-4 py-2 text-xs font-black text-white transition hover:bg-green-800"
        >
          Apply
        </button>

      </div>

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

      <p className="mt-2 text-[10px] font-medium text-slate-400">
        Try SAVE10 or SAVE20
      </p>

    </div>
  );
}

export default Coupon;