import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
 
const publicRoutes = ([
  '/',
  '/events/:id',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
])

export default clerkMiddleware((auth, req) => {
  // Restrict admin route to users with specific role

  // Restrict dashboard routes to signed in users
  if (publicRoutes) auth().protect();
});
  // ignoredRoutes: [
  //   '/api/webhook/clerk',
  //   '/api/webhook/stripe',
  //   '/api/uploadthing'
  // ]
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 