import {Prisma, Booking} from "@/generated/prisma";

export interface BookingInterface{
    createBooking(data: Prisma.BookingCreateInput): Promise<Booking>;

    findBookingById(id: string): Promise<Booking | null>;
    findBookingsByUserId(userId: string): Promise<Booking[]>;

    updateBookingById(id: string, data: Prisma.BookingUpdateInput): Promise<Booking>;
    deleteBookingById(id: string): Promise<Booking>;
    countBookings(): Promise<number>;
    listBookingsPaginated(skip: number, take: number): Promise<Booking[]>;
    searchBookingsByUserName(name: string): Promise<Booking[]>;
    searchBookingsByPlaceName(keyword: string): Promise<Booking[]>;

    // cancelBooking(id: string): Promise<Booking>;
    confirmBooking(id: string): Promise<Booking | null>;

    rescheduleBooking(id: string,newBookingDate: Date): Promise<Booking>;

}