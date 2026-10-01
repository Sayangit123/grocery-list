interface DiscountProps {
  totalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  discountedTotal: number;
}

function Discount({
  totalPrice,
  discountPercentage,
  discountAmount,
  discountedTotal,
}: DiscountProps) {
  return (
    <div>

      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-500">
          Subtotal
        </span>

        <strong className="font-black text-slate-800">
          ₹{totalPrice}
        </strong>
      </div>

      {discountPercentage > 0 && (
        <div className="mt-3 flex justify-between rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">

          <span className="font-bold">
            Discount ({discountPercentage}%)
          </span>

          <strong>
            -₹{discountAmount}
          </strong>

        </div>
      )}

      <div className="mt-3 flex justify-between text-sm">
        <span className="font-medium text-slate-500">
          After Discount
        </span>

        <strong className="font-black text-slate-800">
          ₹{discountedTotal}
        </strong>
      </div>

    </div>
  );
}

export default Discount;