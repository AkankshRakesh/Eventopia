// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

const publicRoutes = [
  '/',
  '/events/:id',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
];

const ignoredRoutes = [
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
];

function isRouteMatched(pathname: string, routes: string[]): boolean {
  return routes.some(route => {
    const regex = new RegExp(route.replace(/:\w+/g, '[^/]+'));
    return regex.test(pathname);
  });
}

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (isRouteMatched(pathname, publicRoutes) || isRouteMatched(pathname, ignoredRoutes)) {
    return NextResponse.next();
  }

  const auth = getAuth(req);

  if (!auth.userId) {
    // Redirect to the login page if the user is not authenticated
    return NextResponse.redirect('/login');
  }

  // Proceed with the request if the user is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
