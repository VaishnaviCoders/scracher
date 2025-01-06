'use client';

import ScratchToRevealDemo from '@/components/ScratchToReveal';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden place-items-center">
      <audio src="../song.mp3" controls loop id="a1" autoPlay></audio>

      <div className="flex justify-center items-center h-screen overflow-hidden place-items-center">
        {/* <div className="fixed top-10"> */}
        <ScratchToRevealDemo />
        {/* </div> */}
      </div>
    </div>
  );
}
