import React, { useEffect } from 'react';
import { useUIStore } from '../store/uistore';
import ColorPickerGrid from './ColorPickerGrid';

export default function EditorPanel() {
  const state = useUIStore();
  const set = (patch) => useUIStore.getState().set(patch);

  // Inject Google Fonts link once
  useEffect(() => {
    const href =
      "https://fonts.googleapis.com/css2?" +
      [
        "family=Inter:wght@100;200;300;400;500;600;700;800;900",
        "family=Roboto:wght@100;300;400;500;700;900",
        "family=Poppins:wght@100;200;300;400;500;600;700;800;900",
        "family=Montserrat:wght@100;200;300;400;500;600;700;800;900",
        "family=Lato:wght@100;300;400;700;900",
        "family=Nunito:wght@200;300;400;600;700;800",
        "family=Source+Sans+3:wght@200;300;400;600;700;800",
        "family=Merriweather:wght@300;400;700",
        "family=Roboto+Slab:wght@300;400;700",
      ].join("&") +
      "&display=swap";

    // Avoid duplicate insertion
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  const exportJSON = () => {
    const cfg = { ...useUIStore.getState() };
    delete cfg.set;
    delete cfg.reset;
    const dataStr = JSON.stringify(cfg, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ui-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const colorPalette = [
    // dark & muted tones
    "#5C4033", "#5F6753", "#56695E", "#59665C", "#625760",
    "#3E4F6B", "#5C2323", "#2F7767", "#6B1E1E", "#2B7763",

    // lighter & pastel tones
    "#E8D5C4", // light beige
    "#D6E2D0", // soft green-gray
    "#E2D6E9", // light lavender
    "#F1D6D2", // soft peach
    "#D0E4E0"  // minty teal
  ];

  return (
    <div className="p-4 border-r w-80 bg-gray-50 overflow-y-auto">
      <h3 className="font-bold mb-3">Editor</h3>

      {/* Typography */}
      <label className="block text-lg">Font Family</label>
      <select
        value={state.fontFamily}
        onChange={e => set({ fontFamily: e.target.value })}
        className="w-full mb-2"
      >
        {/* value holds a full CSS font-family fallback string */}
        <option value={`Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`}>
          Inter
        </option>
        <option value={`Roboto, ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial`}>
          Roboto
        </option>
        <option value={`Poppins, ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial`}>
          Poppins
        </option>
        <option value={`Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial`}>
          Montserrat
        </option>
        <option value={`Lato, ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial`}>
          Lato
        </option>
        <option value={`Nunito, ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial`}>
          Nunito
        </option>
        <option value={`"Source Sans 3", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial`}>
          Source Sans 3
        </option>
        <option value={`Merriweather, Georgia, "Times New Roman", Times, serif`}>
          Merriweather (serif)
        </option>
        <option value={`"Roboto Slab", Georgia, "Times New Roman", Times, serif`}>
          Roboto Slab (serif)
        </option>
        <option value={`Arial, Helvetica, sans-serif`}>Arial (system)</option>
      </select>

      <label className="block text-lg">Font Weight</label>
      <select value={state.fontWeight} onChange={e => set({ fontWeight: Number(e.target.value) })} className="w-full mb-2">
        <option value={400}>400</option>
        <option value={500}>500</option>
        <option value={600}>600</option>
        <option value={700}>700</option>
      </select>

      <label className="block text-sm">Font Size ({state.fontSize}px)</label>
      <input type="range" min="10" max="60" value={state.fontSize}
        onChange={e => set({ fontSize: Number(e.target.value) })} className="w-full mb-3" />

      <hr className="my-3" />

      {/* Button Section */}
      <h4 className="text-lg font-semibold">Button</h4>

      <label className="block text-sm">Border Radius ({state.btnBorderRadius}px)</label>
      <input type="range" min="0" max="40" value={state.btnBorderRadius}
        onChange={e => set({ btnBorderRadius: Number(e.target.value) })} className="w-full mb-2" />

      <label className="block text-sm">Shadow</label>
      <select value={state.btnShadow} onChange={e => set({ btnShadow: e.target.value })} className="w-full mb-2">
        <option value="none">none</option>
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </select>

      <label className="block text-sm">Alignment</label>
      <select value={state.btnAlign} onChange={e => set({ btnAlign: e.target.value })} className="w-full mb-2">
        <option value="left">left</option>
        <option value="center">center</option>
        <option value="right">right</option>
      </select>

      <label className="block text-sm mt-2">Background Color</label>
      <ColorPickerGrid
        colors={colorPalette}
        value={state.btnBg}
        onChange={(color) => set({ btnBg: color })}
      />
      <p className="text-xs text-gray-500 mt-1">{state.btnBg}</p>

      <label className="block text-sm mt-3">Text Color</label>
      <ColorPickerGrid
        colors={["#FFFFFF", "#000000", "#F5F5F5", "#E76F51", "#2A9D8F", "#264653"]}
        value={state.btnText}
        onChange={(color) => set({ btnText: color })}
      />
      <p className="text-xs text-gray-500 mt-1">{state.btnText}</p>

      <hr className="my-3" />

      {/* Gallery Section */}
      <h4 className="text-lg font-semibold">Gallery</h4>
      <label className="block text-sm">Alignment</label>
      <select value={state.galleryAlign} onChange={e => set({ galleryAlign: e.target.value })} className="w-full mb-2">
        <option value="grid-left">grid left</option>
        <option value="grid-right">grid right</option>
        <option value="grid-center">grid center</option>
      </select>

      <label className="block text-sm">Spacing ({state.gallerySpacing}px)</label>
      <input type="range" min="0" max="40" value={state.gallerySpacing}
        onChange={e => set({ gallerySpacing: Number(e.target.value) })} className="w-full mb-2" />

      <label className="block text-sm">Image Radius ({state.imageRadius}px)</label>
      <input type="range" min="0" max="40" value={state.imageRadius}
        onChange={e => set({ imageRadius: Number(e.target.value) })} className="w-full mb-3" />

      <hr className="my-3" />

      {/* Layout Section */}
      <h4 className="text-lg font-semibold">Layout</h4>
      <label className="block text-sm">Card Radius ({state.cardRadius}px)</label>
      <input type="range" min="0" max="40" value={state.cardRadius}
        onChange={e => set({ cardRadius: Number(e.target.value) })} className="w-full mb-2" />

      <label className="block text-sm">Container Padding ({state.containerPadding}px)</label>
      <input type="range" min="0" max="80" value={state.containerPadding}
        onChange={e => set({ containerPadding: Number(e.target.value) })} className="w-full mb-2" />

      <label className="block text-sm">Section Background</label>
      <ColorPickerGrid
        colors={colorPalette}
        value={state.sectionBg}
        onChange={(color) => set({ sectionBg: color })}
      />
      <p className="text-xs text-gray-500 mt-1">{state.sectionBg}</p>

      <hr className="my-3" />

      {/* Stroke Section */}
      <h4 className="text-lg font-semibold">Stroke / Border</h4>
      <label className="block text-sm">Stroke Color</label>
      <ColorPickerGrid
        colors={colorPalette}
        value={state.strokeColor}
        onChange={(color) => set({ strokeColor: color })}
      />
      <p className="text-xs text-gray-500 mt-1">{state.strokeColor}</p>

      <label className="block text-sm mt-3">Stroke Weight ({state.strokeWeight}px)</label>
      <input type="range" min="0" max="8" value={state.strokeWeight}
        onChange={e => set({ strokeWeight: Number(e.target.value) })} className="w-full mb-3" />

      <hr className="my-3" />

      {/* Layout Switch */}
      <label className="block text-sm">Layout Variant</label>
      <select value={state.layoutVariant} onChange={e => set({ layoutVariant: e.target.value })} className="w-full mb-3">
        <option value="variantA">Variant A</option>
        <option value="variantB">Variant B</option>
      </select>

      <div className="flex gap-2">
        <button onClick={() => useUIStore.getState().reset()} className="px-3 py-1 border rounded">
          Reset
        </button>
        <button onClick={exportJSON} className="px-3 py-1 bg-blue-600 text-white rounded">
          Export JSON
        </button>
      </div>
    </div>
  );
}
