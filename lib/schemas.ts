import { z } from 'zod';

export const scratcherImageSchema = z.object({
  imageUrl: z.string(),
});
