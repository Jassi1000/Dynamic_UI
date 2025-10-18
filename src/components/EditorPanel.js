import React from 'react';
import { useUIStore } from '../store/uistore';
import ColorPickerGrid from './ColorPickerGrid';

export default function EditorPanel() {
  const state = useUIStore();
  const set = (patch) => useUIStore.getState().set(patch);

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
    "#5C4033", "#5F6753", "#56695E", "#59665C", "#625760",
    "#8D6A8A", "#3E4F6B", "#B1534D", "#5C2323", "#2F7767",
    "#9B7A9E", "#415C74", "#B9504D", "#6B1E1E", "#2B7763"
  ];

  return (
    <div className="p-4 border-r w-80 bg-gray-50 overflow-y-auto">
      <h3 className="font-bold mb-3">Editor</h3>

      {/* Typography */}
      <label className="block text-sm">Font Family</label>
      <select value={state.fontFamily} onChange={e => set({ fontFamily: e.target.value })} 
      className="w-full mb-2">
        <option>Inter</option>
        <option>Roboto</option>
        <option>Poppins</option>
        <option>Arial</option>
      </select>

      <label className="block text-sm">Font Weight</label>
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
      <h4 className="text-sm font-semibold">Button</h4>

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
      <h4 className="text-sm font-semibold">Gallery</h4>
      <label className="block text-sm">Alignment</label>
      <select value={state.galleryAlign} onChange={e => set({ galleryAlign: e.target.value })} className="w-full mb-2">
        <option value="grid-left">grid left</option>
        <option value="grid-center">grid center</option>
        <option value="grid-right">grid right</option>
      </select>

      <label className="block text-sm">Spacing ({state.gallerySpacing}px)</label>
      <input type="range" min="0" max="40" value={state.gallerySpacing}
        onChange={e => set({ gallerySpacing: Number(e.target.value) })} className="w-full mb-2" />

      <label className="block text-sm">Image Radius ({state.imageRadius}px)</label>
      <input type="range" min="0" max="40" value={state.imageRadius}
        onChange={e => set({ imageRadius: Number(e.target.value) })} className="w-full mb-3" />

      <hr className="my-3" />

      {/* Layout Section */}
      <h4 className="text-sm font-semibold">Layout</h4>
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
      <h4 className="text-sm font-semibold">Stroke / Border</h4>
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
