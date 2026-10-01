interface UndoButtonProps {
  undoLastAction: () => void;
  disabled: boolean;
}

function UndoButton({
  undoLastAction,
  disabled,
}: UndoButtonProps) {
  return (
    <div className="mt-4">

      <button
        onClick={undoLastAction}
        disabled={disabled}
        className="w-full rounded-xl border-2 border-green-100 bg-white py-3 text-xs font-black text-green-700 transition hover:border-green-300 hover:bg-green-50 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300"
      >
        ↶ Undo Last Action
      </button>

    </div>
  );
}

export default UndoButton;