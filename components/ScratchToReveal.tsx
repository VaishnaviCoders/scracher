'use client';

import React, { useState } from 'react';
import ScratchToReveal from './ui/scratch-to-reveal';
import confetti from 'canvas-confetti';

export const ScratchToRevealDemo = () => {
  const loveEmojis = [
    '💖',
    '❤️',
    '😍',
    '😘',
    '🥰',
    '💌',
    '🌹',
    '💋',
    '💘',
    '💓',
  ];

  const loveMessages: string[] = [
    'You&apos;re the melody to my Chotusa heart&apos;s song 🎶.',
    'Every moment with you feels like magic like shaka la ka boom boom ✨.',
    'You&apos;re the peanut butter to my jelly 🍞🍇. Without you, I&apos;m incomplete! ❤️',
    'I&apos;m not a photographer, but I can totally picture us together forever 😘.',
    'I&apos;d be lost without you, probably on Google Maps, but still lost 😅. You&apos;re my GPS! 💖',
    'If I had a star for every time you made me smile, I&apos;d have a galaxy by now ✨.',
    'You must be made of copper and tellurium because you&apos;re Cu-Te! 😏💘',
    'I&apos;m not a mathematician, but our love adds up perfectly 🔢❤️.',
    'Even my dog loves you more than me, and that&apos;s saying something 🐶💓.',
    'You had me at &apos;hello&apos;... and then I stayed for the pizza 🍕💘.',
    'If kisses were snowflakes, I&apos;d send you a blizzard 🌨️💋.',
    'You&apos;re the reason I check my phone so often – it&apos;s like a love lottery every time! 📱💖',
    'I love you more than pizza... and that&apos;s saying a lot 🍕❤️!',
  ];

  const getRandom = (array: any) =>
    array[Math.floor(Math.random() * array.length)];

  const [currentEmoji, setCurrentEmoji] = useState(() => getRandom(loveEmojis));
  const [currentMessage, setCurrentMessage] = useState(() =>
    getRandom(loveMessages)
  );
  const [key, setKey] = useState(0); // Unique key to force re-render
  const [isEmojiVisible, setIsEmojiVisible] = useState(true); // State to manage emoji visibility

  const handleComplete = () => {
    // Show confetti and reveal emoji
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Hide emoji after 1 second and show the message
    setTimeout(() => {
      setIsEmojiVisible(false); // Hide emoji after 1 second
      setCurrentMessage(getRandom(loveMessages)); // Show new message
    }, 1000);

    // Reset the component (key) after displaying the message
    setTimeout(() => {
      setKey((prevKey) => prevKey + 1); // Reset the scratch component
      setIsEmojiVisible(true); // Show the emoji again after resetting
      setCurrentEmoji(getRandom(loveEmojis)); // Set new emoji for next scratch
    }, 3000); // Wait 3 seconds before reset to allow message display
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-xl font-extrabold text-center text-indigo-600">
        Scratch to Reveal Your Special Message 💌
      </h2>
      <div className="text-center font-medium text-gray-700">
        <p>Maza chodusa pyara , Pilly </p>
        <p>
          I&apos;m building this application for you &quot;You are my
          forever&quot; 💘.
        </p>
      </div>

      {/* ScratchToReveal Component with Dynamic Key */}
      <ScratchToReveal
        key={key} // Unique key ensures reset
        width={250}
        height={250}
        minScratchPercentage={70}
        className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gradient-to-r from-pink-300 to-yellow-200 shadow-md"
        onComplete={handleComplete}
        gradientColors={['#FAD02C', '#FF6F61', '#D4A5A5']}
      >
        {isEmojiVisible ? (
          <p className="text-7xl">{currentEmoji}</p> // Show emoji for 1 second
        ) : null}
      </ScratchToReveal>

      {/* Show the message outside the scratch box */}
      <p className="text-lg text-center font-semibold text-gray-700 mt-4">
        {currentMessage} {/* Show message after emoji disappears */}
      </p>
    </div>
  );
};

export default ScratchToRevealDemo;
