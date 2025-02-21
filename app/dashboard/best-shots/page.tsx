import InteractiveBentoGallery from '@/components/interactive-bento-gallery';
import BestShotsFrom from '@/components/ui/BestShotsFrom';
import { prisma } from '@/lib/db';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const revalidate = 360;

const mediaItems = [
  {
    id: 14,
    type: 'image',
    title: 'Anurag Mishra',
    desc: 'Driven, innovative, visionary',
    url: 'https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcbP3rYTiXwH7Y106CepJOsoAgQjyFi3MUfDkh',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 22,
    type: 'video',
    title: 'Dog Puppy',
    desc: 'Adorable loyal companion.',
    url: 'https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4',
    span: 'md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 33,
    type: 'image',
    title: 'Forest Path',
    desc: 'Mystical forest trail',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ',
  },
  {
    id: 44,
    type: 'image',
    title: 'Falling Leaves',
    desc: 'Autumn scenery',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ',
  },
  {
    id: 5,
    type: 'video',
    title: 'Bird Parrot',
    desc: 'Vibrant feathered charm',
    url: 'https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ',
  },
  {
    id: 6,
    type: 'image',
    title: 'Beach Paradise',
    desc: 'Sunny tropical beach',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ',
  },
  {
    id: 7,
    type: 'video',
    title: 'Shiva Temple',
    desc: 'Peaceful Shiva sanctuary.',
    url: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ',
  },
  {
    id: 8,
    type: 'video',
    title: 'Shiva Temple',
    desc: 'Peaceful Shiva sanctuary.',
    url: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ',
  },
  {
    id: 9,
    type: 'video',
    title: 'Bird Parrot',
    desc: 'Vibrant feathered charm',
    url: 'https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ',
  },
  {
    id: 10,
    type: 'image',
    title: 'Beach Paradise',
    desc: 'Sunny tropical beach',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    span: 'md:col-span-1 md:row-span-2 sm:col-span-2 sm:row-span-2 ',
  },
];
const page = async () => {
  const serverData = await prisma.bestShot.findMany();

  const combinedMediaItems = [
    ...mediaItems,
    ...serverData.map((item) => ({
      id: item.id, // Ensure unique IDs
      type: item.type,
      title: item.title,
      desc: item.desc,
      url: item.url,
      span: item.span,
    })),
  ];

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="container mr-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Upload Image/Video</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Image/Video</DialogTitle>
              <DialogDescription>
                Make changes to your Upload Image/Video here.
              </DialogDescription>
            </DialogHeader>
            <BestShotsFrom />
          </DialogContent>
        </Dialog>
      </div>
      <InteractiveBentoGallery
        mediaItems={combinedMediaItems}
        title="Best Shots Of the Life"
        description="Drag and explore our curated collection of shots"
      />
    </div>
  );
};

export default page;
