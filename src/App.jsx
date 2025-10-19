import React, { useState } from 'react';
import EditorPanel from './components/EditorPanel';
import PreviewCard from './components/PreviewCard';
import Dashboard from './components/Dashboard';
import IphonePreviewCard from './components/IphonePreviewCard'; // 👈 rename your iPhone version to this

export default function App() {
  const [isIphoneView, setIsIphoneView] = useState(false);

  return (
    <div className="h-screen flex">
      {/* Left side: Editor */}
      <EditorPanel />

      {/* Right side: Live Preview Area */}
      <div className="flex-1 bg-white flex justify-center items-center fixed right-0 top-0 h-full w-[calc(100%-20rem)] overflow-auto">
        <div className="flex-1 p-8 h-full bg-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Live Preview</h2>

            {/* 🔘 Toggle button */}
            <button
              onClick={() => setIsIphoneView(!isIphoneView)}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {isIphoneView ? 'Switch to Desktop View' : 'Switch to iPhone View'}
            </button>
          </div>

          <div className="p-6 rounded bg-white inline-block">
            {isIphoneView ? (
              <IphonePreviewCard /> // 📱 iPhone-sized card
            ) : (
              <PreviewCard /> // 🖥️ desktop layout
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
