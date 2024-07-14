import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Ensure the WEBHOOK_SECRET is set
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Error occurred -- no svix headers', { status: 400 });
  }

  // Get the body
  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    console.error('Error parsing JSON payload:', err);
    return new NextResponse('Invalid JSON payload', { status: 400 });
  }
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occurred during verification', { status: 400 });
  }

  // Process the event
  try {
    const eventType = evt.type;

    if (eventType === 'user.created') {
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name!,
        lastName: last_name!,
        photo: image_url,
      };

      const newUser = await createUser(user);

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      return NextResponse.json({ message: 'User created', user: newUser });
    }

    if (eventType === 'user.updated') {
      const { id, image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name!,
        lastName: last_name!,
        username: username!,
        photo: image_url,
      };

      const updatedUser = await updateUser(id, user);

      return NextResponse.json({ message: 'User updated', user: updatedUser });
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      const deletedUser = await deleteUser(id!);

      return NextResponse.json({ message: 'User deleted', user: deletedUser });
    }
  } catch (err) {
    console.error('Error processing event:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  // Default response for unhandled event types
  return new NextResponse('Event type not handled', { status: 200 });
}
