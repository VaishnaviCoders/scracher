import { createUploadthing, type FileRouter } from 'uploadthing/next';
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '16MB', maxFileCount: 50 } })
    // Set permissions and file types for this FileRoute

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata);

      console.log('file url', file.url);
      // !!! Whatever is returned here is sent to the clientSide `onClientUploadComplete` callback
      return { uploadedBy: metadata };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
