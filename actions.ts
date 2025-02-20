'use server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// export async function addImages(formData: FormData) {
//   const imageUrls = formData.get('images') as string;

//   if (!imageUrls) {
//     throw new Error('No images provided');
//   }

//   const flattenUrls: string[] = JSON.parse(imageUrls).map((url: string) =>
//     url.trim()
//   );

//   if (flattenUrls.length === 0) {
//     throw new Error('No valid image URLs to process');
//   }

//   await prisma.scratcherImage.createMany({
//     data: flattenUrls.map((url) => ({
//       imageUrl: url,
//       createdAt: new Date(),
//     })),
//   });

//   redirect('/');
// }

export async function addImages(imageUrls: string[]) {
  try {
    const data = await prisma.scratcherImage.create({
      data: {
        createdAt: new Date(),
        imageUrls: imageUrls, // Store images as JSON string
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error saving images:', error);
    return { success: false, error: 'Failed to save images' };
  }
}

const bestShotSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(50),
  url: z.string().min(1, 'Upload a file first'),
  type: z.enum(['image', 'video']),
  span: z.string(),
});
export async function addBestShot(data: z.infer<typeof bestShotSchema>) {
  const validateData = bestShotSchema.parse(data);
  console.log('Student data', validateData);

  await prisma.bestShot.create({
    data: {
      title: validateData.title,
      desc: validateData.desc,
      url: validateData.url,
      type: validateData.type,
      span: validateData.span,
      createdAt: new Date(),
    },
  });
}
