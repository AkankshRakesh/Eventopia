import { clerkMiddleware } from "@clerk/nextjs/server";

const middleware = clerkMiddleware();

export default function handler(req, res) {
  if (req.method === 'GET' && ['/','/events/:id','/api/webhook/clerk','/api/webhook/stripe','/api/uploadthing'].includes(req.url)) {
    // Handle public routes
    res.status(200).end('Public route');
  } else {
    // Apply Clerk middleware
    return middleware(req, res);
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
