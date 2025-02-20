'use client';

import { IKUpload } from 'imagekitio-next';
import React, { useRef, useState } from 'react';
import { Button } from './button';
import { Progress } from '@/components/ui/progress';

const authenticator = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

const handleUploadSuccess = (response: any) => {
  console.log('Upload Success', response);

  const { width, height, fileType, url } = response;

  // Determine col-span and row-span based on dimensions
  let colSpan = 'col-span-1';
  let rowSpan = 'row-span-1';

  if (fileType === 'video') {
    colSpan = 'col-span-2';
    rowSpan = 'row-span-2';
  } else if (width > height) {
    colSpan = 'col-span-2';
  } else if (height > width) {
    rowSpan = 'row-span-2';
  }

  return {
    url,
    type: fileType,
    span: `md:${colSpan} md:${rowSpan} sm:${colSpan} sm:${rowSpan}`,
  };
};

type ImageKitUploaderProps = {
  onUploadSuccess: (data: { url: string; type: string; span: string }) => void;
};

const ImageKitUploader: React.FC<ImageKitUploaderProps> = ({
  onUploadSuccess,
}) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);

  const [progress, setProgress] = useState(0);
  // const [url, setUrl] = useState('');

  return (
    <div>
      <IKUpload
        ref={ikUploadRef}
        onUploadProgress={(progress) => {
          console.log('progress', progress);
          const progressPercentage = Math.round(
            (progress.loaded / progress.total) * 100
          );
          setProgress(progressPercentage);
        }}
        onSuccess={(response) => {
          const uploadData = handleUploadSuccess(response);
          onUploadSuccess(uploadData); // Pass the upload data back to the parent
          setProgress(0); // Reset progress after successful upload
        }}
        authenticator={authenticator}
        max={1}
        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
        publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
        style={{ display: 'none' }}
      />
      <Button
        onClick={() => {
          ikUploadRef.current?.click();
        }}
      >
        Upload File
      </Button>

      {progress > 0 && (
        <Progress value={progress} className="my-5 rounded-lg" />
      )}
    </div>
  );
};

export default ImageKitUploader;
