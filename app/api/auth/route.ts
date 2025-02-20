import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  privateKey: process.env.PRIVATE_KEY!,
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});
export async function GET(request: any) {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
