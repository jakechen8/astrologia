import { NextRequest, NextResponse } from 'next/server';
import { computeChart } from '@/lib/astrology';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dob, birthTime, birthPlace } = body;

    const chart = computeChart(dob, birthTime);

    return NextResponse.json({
      chart,
      birthProfile: {
        dob,
        birthTime,
        birthPlace,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to compute chart' }, { status: 500 });
  }
}

export async function GET() {
  // In production: fetch from Firebase
  return NextResponse.json({
    message: 'Profile endpoint ready',
  });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    // In production: update preferences in Firebase
    return NextResponse.json({ success: true, updated: body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}

export async function DELETE() {
  // In production: delete all user data from Firebase
  return NextResponse.json({ success: true, message: 'All data erased' });
}
