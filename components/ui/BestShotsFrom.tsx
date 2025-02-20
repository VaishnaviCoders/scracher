'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './button';
import ImageKitUploader from './Imagekit-uploader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { addBestShot } from '@/actions';

const bestShot = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(50),
  url: z.string().min(1, 'Upload a file first'),
  type: z.enum(['image', 'video']),
  span: z.string(),
});

const BestShotsFrom = () => {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof bestShot>>({
    resolver: zodResolver(bestShot),
    defaultValues: {
      title: '',
      desc: '',
      url: '',
      type: 'image',
      span: '',
    },
  });

  async function onSubmit(data: z.infer<typeof bestShot>) {
    try {
      console.log('Submitting...', data);
      setPending(true);
      await addBestShot(data);
      // toast.success('Student created successfully!');
      form.reset();
    } catch (error) {
      // toast.error('Error creating student');
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        console.error(error.message);
      }
    } finally {
      setPending(false);
      console.log('Done');
    }
  }

  return (
    <div className="container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display Title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public Description name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <ImageKitUploader
                    onUploadSuccess={(data) => {
                      field.onChange(data.url); // ✅ Update URL in form
                      form.setValue('type', data.type as 'image' | 'video'); // ✅ Update type
                      form.setValue('span', data.span); // ✅ Update span
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={pending}>
            {pending ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BestShotsFrom;
