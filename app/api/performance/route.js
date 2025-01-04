import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongodb';

export async function GET() {
  await dbConnect();

  const performance = [
    { id: 1, subject: 'Math', score: 95, date: '2023-01-01' },
    { id: 2, subject: 'Science', score: 88, date: '2023-01-02' },
    // Add more performance records as needed
  ];

  console.log('Returning performance data:', performance);
  return NextResponse.json(performance, { status: 200 });
}