import React, { useState } from "react";
import furnitureMain from "./assets/furnitureMain.png";

export default function Dashboard() {
  const [selectedColor, setSelectedColor] = useState("Leather Brown");
  const [selectedMaterial, setSelectedMaterial] = useState("Steel");

  const colors = [
    { name: "Leather Brown", code: "#5E4B4B" },
    { name: "Olive Green", code: "#4F5D4E" },
    { name: "Charcoal", code: "#4A4A4A" },
    { name: "Deep Plum", code: "#5C4A64" },
  ];

  const materials = ["Steel", "Wood", "Aluminum"];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* LEFT SIDE: Product Preview */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 relative">
        <img
          src={furnitureMain}
          alt="Product"
          className="w-3/4 rounded-lg shadow-md"
        />

        {/* Small thumbnails */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`/assets/preview-${i}.png`}
              alt={`Preview ${i}`}
              className="w-16 h-16 object-cover rounded-md cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: Customization Panel */}
      <div className="w-[420px] bg-white h-full border-l border-gray-200 overflow-y-auto p-6">
        <h1 className="text-2xl font-semibold mb-1">Cozy Lounge Chair</h1>
        <p className="text-gray-500 text-sm mb-6">Customize your chair</p>

        {/* Material */}
        <div className="mb-6">
          <h2 className="font-medium mb-2">1. Material</h2>
          <div className="flex gap-3">
            {materials.map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(mat)}
                className={`px-3 py-2 rounded-md border ${
                  selectedMaterial === mat
                    ? "border-black bg-gray-100"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="mb-6">
          <h2 className="font-medium mb-2">2. Color</h2>
          <div className="grid grid-cols-6 gap-3">
            {colors.map((c) => (
              <div
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`relative w-8 h-8 rounded-full cursor-pointer border-2 ${
                  selectedColor === c.name
                    ? "border-orange-500 scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: c.code }}
                title={c.name}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">{selectedColor}</p>
        </div>

        {/* Price + Button */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold">$200</p>
            <p className="text-sm line-through text-gray-400">$245</p>
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
