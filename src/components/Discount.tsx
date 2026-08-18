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
      {/* SUBTOTAL */}
      <div className="flex justify-between text-sm text-slate-500">
        <span>
          Subtotal
        </span>

        <strong className="text-slate-800">
          ₹{totalPrice}
        </strong>
      </div>

      {/* AUTOMATIC DISCOUNT */}
      {discountPercentage > 0 && (
        <div className="mt-3 flex justify-between text-sm text-green-600">
          <span>
            Discount ({discountPercentage}%)
          </span>

          <strong>
            -₹{discountAmount}
          </strong>
        </div>
      )}

      {/* AFTER DISCOUNT */}
      <div className="mt-3 flex justify-between text-sm text-slate-500">
        <span>
          After Discount
        </span>

        <strong className="text-slate-800">
          ₹{discountedTotal}
        </strong>
      </div>
    </div>
  );
}

export default Discount;