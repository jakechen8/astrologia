import { NextRequest, NextResponse } from 'next/server';

// In production, integrate with Firebase Auth phone verification
// or a service like MSG91, Twilio, etc.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, phone, otp } = body;

    if (action === 'start') {
      // Generate and send OTP
      // In production: use Firebase Auth or SMS service
      console.log(`[OTP] Sending OTP to +91${phone}`);

      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
        // In dev mode, return a test OTP
        ...(process.env.NODE_ENV === 'development' && { testOtp: '123456' }),
      });
    }

    if (action === 'verify') {
      // Verify OTP
      // In production: verify with Firebase Auth
      const isValid = otp === '123456' || process.env.NODE_ENV === 'development';

      if (isValid) {
        return NextResponse.json({
          success: true,
          user: {
            id: crypto.randomUUID(),
            phone,
            createdAt: new Date().toISOString(),
          },
          token: 'mock-jwt-token',
        });
      }

      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "start" or "verify".' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Auth failed' },
      { status: 500 }
    );
  }
}
