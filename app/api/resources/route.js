import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongodb';

export async function GET() {
  await dbConnect();

  const resources = [
    { id: 1, title: 'Math Resource', description: 'Learn math here.', link: '/resources/1' },
    { id: 2, title: 'Science Resource', description: 'Learn science here.', link: '/resources/2' },
    // Add more resources as needed
  ];

  console.log('Returning resources data:', resources);
  return NextResponse.json(resources, { status: 200 });
}