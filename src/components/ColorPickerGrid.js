import React from "react";

export default function ColorPickerGrid({ colors, value, onChange }) {
  return (
    <div className="grid grid-cols-6 gap-3 mt-2">
      {colors.map((c, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onChange(c)}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: c,
            border:
              value === c
                ? "3px solid #E76F51" // selected ring
                : "2px solid transparent",
            outline: value === c ? "1px solid #fff" : "none",
            boxShadow:
              value === c ? "0 0 0 2px rgba(231,111,81,0.5)" : "none",
          }}
        />
      ))}
    </div>
  );
}
