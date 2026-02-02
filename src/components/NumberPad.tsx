import React from "react";

interface Props {
  disabled?: boolean;
  onInput: (value: number | null) => void;
}

function NumberPad({ disabled = false, onInput }: Props) {
  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="grid grid-cols-5 gap-2 select-none">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onClick={() => onInput(n)}
            className="h-12 rounded-md border border-gray-300 bg-white font-urbanist text-lg active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Enter ${n}`}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          disabled={disabled}
          onClick={() => onInput(null)}
          className="h-12 rounded-md border border-gray-300 bg-white font-urbanist text-lg active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Clear cell"
        >
          Clear
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-gray-500 font-urbanist">
        Tip: on desktop you can also type 1–9, use delete/backspace to clear, and
        arrow keys to move.
      </p>
    </div>
  );
}

export default NumberPad;

