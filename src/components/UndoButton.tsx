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
        className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
      >
        ↶ Undo Last Action
      </button>
    </div>
  );
}

export default UndoButton;