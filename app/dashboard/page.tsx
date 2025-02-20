import ImagesUploader from '@/components/uploaderForm';
import { prisma } from '@/lib/db';
import Image from 'next/image';
import React from 'react';

const page = async () => {
  const data = await prisma.scratcherImage.findMany();

  return (
    <div>
      {data.map((image) => (
        <div key={image.id} className="flex flex-col gap-2">
          <h1>{image.id}</h1>
          <div>
            {image.imageUrls.map((url, index) => (
              <Image
                alt="image"
                key={index}
                src={url}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
      ))}

      <ImagesUploader />
    </div>
  );
};

export default page;
