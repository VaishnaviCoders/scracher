declare module 'canvas-confetti' {
  const confetti: (options?: {
    particleCount?: number;
    spread?: number;
    origin?: { y: number };
  }) => void;
  export default confetti;
}
