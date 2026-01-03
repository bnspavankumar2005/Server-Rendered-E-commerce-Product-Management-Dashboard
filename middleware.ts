import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes are protected
// This selects anything starting with /admin
const isProtectedRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // 2. If the user tries to go to /admin AND is not logged in...
  if (isProtectedRoute(req)) {
    // ... force them to sign in
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};