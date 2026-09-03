import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================
// RATE LIMITER (In-Memory)
// ============================================
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_CONFIG = {
  maxRequests: 100,
  windowMs: 60 * 1000,
};

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : "unknown";
  const pathname = request.nextUrl.pathname;
  return `${ip}:${pathname}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_CONFIG.windowMs });
    return { allowed: true, remaining: RATE_LIMIT_CONFIG.maxRequests - 1 };
  }

  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count };
}

// ============================================
// LOGGING
// ============================================
function logAccess(
  request: NextRequest,
  status: "allowed" | "blocked" | "redirected",
  reason?: string
) {
  const timestamp = new Date().toISOString();
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const pathname = request.nextUrl.pathname;

  const logEntry = {
    timestamp,
    ip,
    pathname,
    status,
    reason,
    userAgent: userAgent.substring(0, 100),
  };

  if (status === "blocked" || status === "redirected") {
    console.warn(`[MIDDLEWARE] ${JSON.stringify(logEntry)}`);
  } else {
    console.log(`[MIDDLEWARE] ${JSON.stringify(logEntry)}`);
  }
}

// ============================================
// MAIN MIDDLEWARE
// ============================================
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 1. Rate Limiting Check
  const rateLimitKey = getRateLimitKey(request);
  const { allowed, remaining } = checkRateLimit(rateLimitKey);

  if (!allowed) {
    logAccess(request, "blocked", "Rate limit exceeded");
    return new NextResponse(
      JSON.stringify({
        error: "Terlalu banyak request. Silakan coba lagi nanti.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "300",
        },
      }
    );
  }

  // 2. Auth Check
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ??
    request.cookies.get("__Secure-authjs.session-token")?.value;

  if (!sessionToken) {
    logAccess(request, "redirected", "No session token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Access Granted
  logAccess(request, "allowed");

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  return response;
}

// ============================================
// CONFIGURATION
// ============================================
export const config = {
  matcher: ["/admin/:path*"],
};
