import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongodb';

export async function GET() {
  await dbConnect();

  const tests = [
    { id: 1, title: 'Math Test', description: 'Test your math skills.', link: '/mock-tests/1' },
    { id: 2, title: 'Science Test', description: 'Test your science knowledge.', link: '/mock-tests/2' },
    // Add more tests as needed
  ];

  console.log('Returning mock tests data:', tests);
  return NextResponse.json(tests, { status: 200 });
}