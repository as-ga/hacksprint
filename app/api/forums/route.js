import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongodb';

export async function GET() {
  await dbConnect();

  const forums = [
    { id: 1, title: 'General Discussion', description: 'Talk about anything here.', link: '/forums/1' },
    { id: 2, title: 'Help and Support', description: 'Get help and support here.', link: '/forums/2' },
    // Add more forums as needed
  ];

  console.log('Returning forums data:', forums);
  return NextResponse.json(forums, { status: 200 });
}