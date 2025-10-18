import React from 'react';
import EditorPanel from './components/EditorPanel';
import PreviewCard from './components/PreviewCard';

export default function App() {
  return (
    <div className="min-h-screen flex">
      <EditorPanel />
      <div className="flex-1 bg-white flex justify-center items-center fixed right-0 top-0 h-full w-[calc(100%-20rem)] overflow-auto">
      <div className="flex-1 p-8 h-full bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <div className="p-6 rounded bg-white inline-block">
          <PreviewCard />
        </div>
      </div>
      </div>
    </div>
  );
}
