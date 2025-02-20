import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export function UploadImage() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending} // Only disable when pending
      size="lg"
      type="submit"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" size="icon" />
          Please Wait
        </>
      ) : (
        'Upload Image'
      )}
    </Button>
  );
}
