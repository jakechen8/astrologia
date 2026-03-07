import { NextRequest, NextResponse } from "next/server";

// ============================================================
// In-memory storage for magic codes (expires after 10 min)
// ============================================================

interface StoredCode {
  code: string;
  email: string;
  expiresAt: number;
  createdAt: number;
}

const codeStore = new Map<string, StoredCode>();

// Cleanup expired codes every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of codeStore.entries()) {
    if (value.expiresAt < now) {
      codeStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

// ============================================================
// Utility functions
// ============================================================

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

// ============================================================
// API Handler
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, code } = body;

    if (!action || !email) {
      return NextResponse.json(
        { error: "Missing action or email" },
        { status: 400 }
      );
    }

    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;

    // ============================================================
    // ACTION: Send magic code
    // ============================================================
    if (action === "send") {
      // Generate new code
      const newCode = generateCode();
      const expiresAt = now + TEN_MINUTES;

      // Store in memory
      codeStore.set(email, {
        code: newCode,
        email,
        expiresAt,
        createdAt: now,
      });

      // In production, you would send via email service (SendGrid, Resend, etc.)
      // For now, we log it and return it in dev mode
      console.log(`[Magic Code] ${email}: ${newCode} (expires at ${new Date(expiresAt).toISOString()})`);

      const response: any = {
        success: true,
        message: `Magic code sent to ${email}`,
      };

      // In development, return the code for testing
      if (!isProduction()) {
        response.devCode = newCode;
      }

      return NextResponse.json(response);
    }

    // ============================================================
    // ACTION: Verify magic code
    // ============================================================
    if (action === "verify") {
      if (!code) {
        return NextResponse.json(
          { error: "Missing verification code" },
          { status: 400 }
        );
      }

      const stored = codeStore.get(email);

      if (!stored) {
        return NextResponse.json(
          { error: "No code found for this email. Request a new one." },
          { status: 401 }
        );
      }

      if (stored.expiresAt < now) {
        codeStore.delete(email);
        return NextResponse.json(
          { error: "Code has expired. Request a new one." },
          { status: 401 }
        );
      }

      if (stored.code !== code) {
        return NextResponse.json(
          { error: "Invalid code" },
          { status: 401 }
        );
      }

      // Code is valid! Clean up and return user
      codeStore.delete(email);

      // Create user object (in production, you'd create/fetch from DB)
      const user = {
        id: crypto.randomUUID(),
        email,
        phone: "",
        createdAt: new Date(),
        languagePref: "en" as const,
        tonePref: "gentle" as const,
        timezone: "UTC",
        streak: 0,
        onboardingComplete: false,
      };

      // Generate a mock token (in production, use JWT or session)
      const token = Buffer.from(JSON.stringify({ userId: user.id, email })).toString("base64");

      return NextResponse.json({
        success: true,
        user,
        token,
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Magic Link Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
