import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const url = request.nextUrl.clone();

    // Skip Vercel deployment URLs (they contain .vercel.app)
    if (hostname.includes('.vercel.app') || hostname.includes('localhost')) {
        return NextResponse.next();
    }

    // Extract subdomain
    const parts = hostname.split('.');

    // Check if it's a subdomain (not www, not main domain)
    if (parts.length >= 3) {
        const subdomain = parts[0];

        // Skip common subdomains
        if (subdomain === 'www' || subdomain === 'api' || subdomain === 'admin') {
            return NextResponse.next();
        }

        // Rewrite to creator-specific route
        // tulika.goodtimez.com/feed -> /c/tulika/feed
        url.pathname = `/c/${subdomain}${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
