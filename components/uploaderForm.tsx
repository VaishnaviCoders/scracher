'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { UploadDropzone } from '@/lib/uploadething';
import Image from 'next/image';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { addImages } from '@/actions';

export default function ImagesUploader() {
  const [images, setImages] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  console.log('images', images);

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUploadComplete = (res: any) => {
    const uploadedImages = res.map((file: any) => file.url);
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    startTransition(async () => {
      const result = await addImages(images);
      if (result.success) {
        alert('Images uploaded successfully!');
        setImages([]); // Clear images after upload
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-5"
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft />
          </Link>
        </Button>
        <h1>Go To Images</h1>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <Button key={index}>
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover border-dashed border"
              height={84}
              src={image}
              width={84}
            />
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Label>Images</Label>
        <input type="hidden" value={images} />
        <div className="flex gap-5">
          {images.map((image, index) => (
            <div key={index} className=" relative w-[100px] h-[100px]">
              <Image
                height={100}
                width={100}
                src={image}
                alt="product image"
                className="w-full p-2 h-full object-cover rounded-lg border"
              />

              <Button
                onClick={() => handleDeleteImage(index)}
                size="icon"
                className="absolute -right-3 -top-3 bg-red-500 rounded-lg"
              >
                <XIcon className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <input type="hidden" name="images" value={JSON.stringify(images)} />

        <Button type="submit" className="mt-3" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Images'}
        </Button>
      </div>
    </form>
  );
}
