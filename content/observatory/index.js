/**
 * PRANAVI RUDRADEV PORTFOLIO — THE OBSERVATORY
 * Maintained via /admin
 */

import { PALETTE } from '../../config/colors.js';

export const OBSERVATORY_CATEGORIES = Object.freeze({
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  DOCUMENTARY: 'DOCUMENTARY',
});

export const OBSERVATORY_DOCUMENTARY = {
  title: "Behind the Shadows: Crafting a Documentary on India’s Shadow Puppetry Tradition",
  badge: "FIELD OBSERVATION",
  meta: "4K UHD · 24 FPS · 18:24",
  videoSrc: "",
  description: "As the Documentary Head, I led the creative journey of this film from ideation and shot planning to post production, documenting the endangered art of Tholu Bommalata in Nimmalakunta, Andhra Pradesh. After fieldwork, the editing process became a narrative puzzle, sorting interviews, identifying emotional anchors, and carefully structuring the story to preserve authenticity. Using DaVinci Resolve and GarageBand, we worked across editing, sound design, audio treatment, and live background recreation to create an experience that felt both cinematic and respectful to the community we documented. Collaborating across teams while refining the narrative taught me how creative direction, technical execution, and cultural sensitivity come together to create meaningful visual storytelling."
};

export const OBSERVATORY_ENTRIES = Array.from({ length: 22 }, (_, i) => {
  const num = i + 1;
  const initialImages = [
    "assets/observatory/images/beetle-macro.jpg",
    "https://afclwzukxhsfvrpmuaqo.supabase.co/storage/v1/object/public/portfolio-assets/uploads/observatory-images/2.png",
    "https://afclwzukxhsfvrpmuaqo.supabase.co/storage/v1/object/public/portfolio-assets/uploads/observatory-images/3.png",
    "https://afclwzukxhsfvrpmuaqo.supabase.co/storage/v1/object/public/portfolio-assets/uploads/observatory-images/4.png"
  ];
  return {
    id: `pic-${num}`,
    title: `Pic ${num}`,
    media: {
      type: "image",
      src: initialImages[i] || "",
      aspectRatio: "5/4",
      alt: `Pic ${num}`
    }
  };
});
