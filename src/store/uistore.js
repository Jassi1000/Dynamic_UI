import {create} from 'zustand';

export const useUIStore = create((set) => ({
  // Typography
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 14, // px

  // Button
  btnBorderRadius: 6,
  btnShadow: 'small', // none, small, medium, large
  btnAlign: 'left', // left/center/right
  btnBg: '#b35743',
  btnText: '#ffffff',

  // Galleries/Images
  galleryAlign: 'grid-left', // grid-left, grid-center, grid-right
  gallerySpacing: 8, // px
  imageRadius: 6,

  // General layout
  cardRadius: 12,
  containerPadding: 20,
  sectionBg: '#ffffff',

  // Stroke/border
  strokeColor: '#e5e5e5',
  strokeWeight: 1,

  // Layout switching
  layoutVariant: 'variantA', // variantA | variantB

  // actions
  set: (patch) => set((s) => ({...s, ...patch})),
  reset: () => set({
    fontFamily: 'Inter', fontWeight:400, fontSize:14,
    btnBorderRadius:6, btnShadow:'small', btnAlign:'left', btnBg:'#b35743', btnText:'#ffffff',
    galleryAlign:'grid-left', gallerySpacing:8, imageRadius:6,
    cardRadius:12, containerPadding:20, sectionBg:'#ffffff',
    strokeColor:'#e5e5e5', strokeWeight:1,
    layoutVariant:'variantA'
  })
}));
