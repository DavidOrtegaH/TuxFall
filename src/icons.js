// All glyph bounds are centered on (16, 16), independent of font metrics.
const svg=path=>`<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">${path}</svg>`;
export const playIcon=svg('<path d="M9 6 23 16 9 26Z" fill="currentColor"/>');
export const pauseIcon=svg('<path d="M8 7h5v18H8zm11 0h5v18h-5z" fill="currentColor"/>');
export const retryIcon=svg('<path d="M23 23c-1.8 1.9-4.2 3-7 3C10.477 26 6 21.523 6 16S10.477 6 16 6c4 0 7 2 9 5M26 6v8h-8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"/>');
export const soundIcon=svg('<path d="M8 12h5L24 5v22L13 20H8z" fill="currentColor"/>');
export const mutedIcon=svg('<path d="M8 12h5L24 5v22L13 20H8z" fill="currentColor"/><path d="m6 6 20 20" stroke="var(--speaker-paper,#eeeee7)" stroke-width="5"/><path d="m6 6 20 20" stroke="currentColor" stroke-width="2.5"/>');
