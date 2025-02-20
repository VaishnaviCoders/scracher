'use client';

import React, { useState } from 'react';
import ScratchToReveal from './ui/scratch-to-reveal';
import confetti from 'canvas-confetti';
import image1 from '@/images/IMG-20241111-WA0098.jpg';
import image2 from '@/images/IMG-20241111-WA0100.jpg';
import image3 from '@/images/IMG-20241111-WA0101.jpg';
import image4 from '@/images/IMG-20241111-WA0105.jpg';
import image5 from '@/images/IMG-20241111-WA0109.jpg';
import image6 from '@/images/IMG-20241111-WA0113.jpg';
import image7 from '@/images/IMG-20241111-WA0114.jpg';
import image8 from '@/images/IMG-20241111-WA0115.jpg';
import image9 from '@/images/IMG-20241111-WA0116.jpg';
import image10 from '@/images/IMG-20241118-WA0117.jpg';
import image11 from '@/images/IMG-20241118-WA0118.jpg';
import image12 from '@/images/IMG-20241118-WA0119.jpg';
import image13 from '@/images/IMG-20241118-WA0123.jpg';
import image14 from '@/images/IMG-20241204-WA0010.jpg';
import image15 from '@/images/IMG-20241221-WA0004.jpg';
import image16 from '@/images/IMG-20241223-WA0038.jpg';
import image17 from '@/images/IMG-20241230-WA0017.jpg';
import image18 from '@/images/IMG-20241230-WA0018.jpg';

import Image from 'next/image';

export const ScratchToRevealDemo = () => {
  // Array of image URLs (replace with your actual image paths)
  const loveImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
  ];

  const loveMessages = [
    "You're the melody to my Chotusa heart’s song.",
    'Every moment with you feels like magic like shaka la ka boom boom ✨.',
    "You're the peanut butter to my jelly 🍞🍇. Without you, I'm incomplete! ❤️",
    'I’m not a photographer, but I can totally picture us together forever 😘.',
    "I’d be lost without you, probably on Google Maps, but still lost 😅. You're my GPS! 💖",
    'If I had a star for every time you made me smile, I’d have a galaxy by now ✨.',
    "You must be made of copper and tellurium because you're Cu-Te! 😏💘",
    'I’m not a mathematician, but our love adds up perfectly 🔢❤️.',
    'Even my dog loves you more than me, and that’s saying something 🐶💓.',
    "i love the way you make me feel like i'm a part of you",
    'If kisses were snowflakes, I’d send you a blizzard 🌨️💋.',
    'You’re the reason I check my phone so often – it’s like a love lottery every time! 📱💖',
    "I love you more than pizza... and that's saying a lot (aila pilly mala athavl tu ksa undra srakha pizza khat hoti dominoes madhe Lol 😘😘 )🍕❤️!",
  ];

  const getRandom = (array: any) =>
    array[Math.floor(Math.random() * array.length)];

  const [currentImage, setCurrentImage] = useState(() => getRandom(loveImages));
  const [currentMessage, setCurrentMessage] = useState(() =>
    getRandom(loveMessages)
  );
  const [key, setKey] = useState(0); // Unique key to force re-render
  const [isImageVisible, setIsImageVisible] = useState(true); // State to manage image visibility

  const handleComplete = () => {
    // Show confetti and reveal image
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Hide image after 1 second and show the message
    setTimeout(() => {
      setIsImageVisible(false); // Hide image after 1 second
      setCurrentMessage(getRandom(loveMessages)); // Show new message
    }, 2000);

    // Reset the component (key) after displaying the message
    setTimeout(() => {
      setKey((prevKey) => prevKey + 1); // Reset the scratch component
      setIsImageVisible(true); // Show the image again after resetting
      setCurrentImage(getRandom(loveImages)); // Set new image for next scratch
    }, 2000); // Wait 3 seconds before reset to allow message display
  };

  // const settings = {
  //   width: 640,
  //   height: 480,
  //   image: 'image.jpg',
  //   finishPercent: 50,
  //   onComplete: () => console.log('The card is now clear!'),
  // };

  return (
    <div className="flex flex-col justify-center items-center space-y-6 h-full">
      <div className="text-center font-medium text-gray-700">
        <p>
          Maza chodusa pyara ,{' '}
          <span className="text-red-500 font-medium"> Pilly</span>{' '}
        </p>
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
        className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gradient-to-r from-pink-300 to-yellow-200 shadow-md "
        onComplete={handleComplete}
        gradientColors={['#FAD02C', '#FF6F61', '#D4A5A5']}
      >
        {isImageVisible ? (
          <Image
            src={currentImage}
            alt="Love image"
            className="w-full h-full object-cover"
            width={1050}
            height={1050}
          />
        ) : null}
      </ScratchToReveal>
      {/* Show the message outside the scratch box */}
      <p className="text-lg text-center font-semibold text-gray-700 mt-4">
        {currentMessage} {/* Show message after image disappears */}
      </p>
    </div>
  );
};

export default ScratchToRevealDemo;
