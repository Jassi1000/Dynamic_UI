import React from 'react';
import { useUIStore } from '../store/uistore';
import Gallery from './Gallery';

const shadowMap = {
  none: 'none',
  small: '0 1px 3px rgba(0,0,0,0.08)',
  medium: '0 4px 8px rgba(0,0,0,0.12)',
  large: '0 8px 20px rgba(0,0,0,0.16)'
};

export default function PreviewCard() {
  const state = useUIStore();

  const cardStyle = {
    borderRadius: state.cardRadius,
    padding: state.containerPadding,
    background: state.sectionBg,
    border: `${state.strokeWeight}px solid ${state.strokeColor}`,
    fontFamily: state.fontFamily,
    fontWeight: state.fontWeight,
    fontSize: state.fontSize + 'px',
    color: '#222'
  };

  const btnStyle = {
    background: state.btnBg,
    color: state.btnText,
    borderRadius: state.btnBorderRadius,
    boxShadow: shadowMap[state.btnShadow],
    padding: '8px 14px',
  };

  const alignStyle = { display: 'flex', justifyContent: state.btnAlign === 'left' ? 'flex-start' : (state.btnAlign === 'center' ? 'center' : 'flex-end') };

  return (
    <div style={cardStyle} className="max-w-md">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div>
          <div style={{ fontSize: state.fontSize + 2 + 'px', fontWeight: state.fontWeight }}>Cozy Lounge chair</div>
          <div style={{ fontSize: Math.max(12, state.fontSize - 2), color: '#666' }}>Customize your chair</div>
        </div>
        <div style={{ width: 60, height: 60, borderRadius: 8, background: '#eee' }}></div>
      </div>

      <Gallery />

      <div style={{ marginTop: 12 }}>
        <div style={alignStyle}>
          <button style={btnStyle}>Add to cart</button>
        </div>
      </div>

      {state.layoutVariant === 'variantB' && (
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed #eee' }}>
          <div style={{ fontSize: 12, color: '#777' }}>Variant B extra panel</div>
        </div>
      )}
    </div>
  );
}
