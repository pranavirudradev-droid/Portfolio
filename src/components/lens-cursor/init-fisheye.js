/**
 * PRANAVI RUDRADEV PORTFOLIO — FISHEYE LENS AUTO-INITIALIZER
 * 
 * Automatically initializes the canonical 76px optical fisheye lens
 * when imported as a script module on any page.
 */

import { FisheyeCursor } from './FisheyeCursor.js';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const lens = new FisheyeCursor();
      lens.mount();
    });
  } else {
    const lens = new FisheyeCursor();
    lens.mount();
  }
}
