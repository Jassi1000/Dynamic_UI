import React from 'react';
import { useUIStore } from '../store/uistore';

export default function Gallery() {
  const { gallerySpacing, imageRadius, galleryAlign } = useUIStore();
  const imgs = [1,2,3,4,5,6].map(i => `https://picsum.photos/200?random=${i}`);

  let justify = 'flex-start';
  if (galleryAlign === 'grid-center') justify = 'center';
  if (galleryAlign === 'grid-right') justify = 'flex-end';

  return (
    <div className="w-full">
      <div style={{ display: 'flex', gap: gallerySpacing + 'px', justifyContent: justify, flexWrap: 'wrap' }}>
        {imgs.map((src,i) => (
          <img
            key={i}
            src={src}
            alt="sample"
            style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: imageRadius }}
          />
        ))}
      </div>
    </div>
  );
}
