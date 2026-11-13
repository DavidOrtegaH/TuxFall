// All glyph bounds are centered on (16, 16), independent of font metrics.
const svg=path=>`<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">${path}</svg>`;
export const playIcon=svg('<path d="M9 6 23 16 9 26Z" fill="currentColor"/>');
export const pauseIcon=svg('<path d="M8 7h5v18H8zm11 0h5v18h-5z" fill="currentColor"/>');
export const retryIcon=svg('<path d="M26 16a10 10 0 1 1-10-10c4 0 7 2 9 5M26 6v8h-8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"/>');
