import ScratchToRevealDemo from '@/components/ScratchToReveal';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="fixed top-10">
        <ScratchToRevealDemo />
      </div>
    </div>
  );
}
