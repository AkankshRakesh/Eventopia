import React from 'react';
import { Button } from '../ui/button';
import { IEvent } from '@/lib/database/models/event.model';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CheckCircleIcon, XIcon } from '@heroicons/react/outline';
import { createOrder } from '@/lib/actions/order.actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
    const router = useRouter(); // Initialize useRouter

    const onCheckout = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        const order = {
            eventId: event._id,
            totalAmount: event.price ? event.price.toString() : '0',
            buyerId: userId,
            createdAt: new Date()
        };

        await createOrder(order);

        // Navigate to the /profile page
        router.push('/profile');
    };

    return (
        <form onSubmit={onCheckout}>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="submit" size="lg" className="button sm:w-fit">
                        {event.organizer._id === userId ? (
                            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
                                Order Details
                            </Link>
                        ) : event.isFree ? 'Get Ticket' : `Buy Ticket for ₨${event.price}`}
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-white max-w-full sm:max-w-md md:max-w-lg mx-auto my-4 p-4 md:p-6 rounded-md shadow-lg min-h-[380px] md:min-h-[438px]">
                    <AlertDialogCancel className="absolute top-2 right-2 p-1">
                        <XIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </AlertDialogCancel>
                    <AlertDialogHeader className="flex items-center justify-center">
                        <AlertDialogTitle className="hidden">Are you sure you want to delete?</AlertDialogTitle>
                        <AlertDialogDescription className="p-regular-16 text-grey-600">
                            <div className="flex items-center justify-center p-4 sm:p-6 bg-white rounded-md">
                                <CheckCircleIcon className="w-12 h-12 text-green-500" />
                                <span className="ml-4 text-xl font-semibold text-green-500">Success!</span>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </form>
    );
};

export default Checkout;
