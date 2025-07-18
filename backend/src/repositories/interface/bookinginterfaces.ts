import {Prisma, Booking} from "@/generated/prisma";

export interface BookingInterface{
    createBooking(data: Prisma.BookingCreateInput): Promise<Booking>;

    findBookingById(id: string): Promise<Booking | null>;
    findBookingsByUserId(userId: string): Promise<Booking[]>;
    findBookingsByPlaceId(placeId: string): Promise<Booking[]>;
    findBookingsByDateRange(startDate: Date, endDate: Date): Promise<Booking[]>;
    findBookingsByStatus(status: string): Promise<Booking[]>;

    updateBookingById(id: string, data: Prisma.BookingUpdateInput): Promise<Booking>;
    deleteBookingById(id: string): Promise<Booking>;
    countBookings(): Promise<number>;
    listBookingsPaginated(skip: number, take: number): Promise<Booking[]>;
    searchBookingsByUserName(keyword: string): Promise<Booking[]>;
    searchBookingsByPlaceName(keyword: string): Promise<Booking[]>;

    cancelBooking(id: string): Promise<Booking>;
    confirmBooking(id: string): Promise<Booking>;

    getBookingDetails(id: string): Promise<Booking>;
    getBookingHistory(userId: string): Promise<Booking[]>;
    getBookingStatistics(): Promise<{ totalBookings: number; totalRevenue: number }>;
    getUpcomingBookings(userId: string): Promise<Booking[]>;
    getPastBookings(userId: string): Promise<Booking[]>;
    getBookingsByStatusAndDateRange(status: string, startDate: Date, endDate: Date): Promise<Booking[]>;
    getBookingsByPlaceAndDateRange(placeId: string, startDate: Date, endDate: Date): Promise<Booking[]>;
    getBookingsByUserAndDateRange(userId: string, startDate: Date, endDate: Date): Promise<Booking[]>;
    getBookingByConfirmationCode(confirmationCode: string): Promise<Booking | null>;
    getBookingByPaymentId(paymentId: string): Promise<Booking | null>;

    rescheduleBooking(id: string, newStartDate: Date, newEndDate: Date): Promise<Booking>;
    getBookingByRescheduleId(rescheduleId: string): Promise<Booking | null>;

    getBookingByCancellationId(cancellationId: string): Promise<Booking | null>;
    getBookingByUserPlaceAndCancellationId(userId: string, placeId: string, cancellationId: string): Promise<Booking | null>;
    

    getBookingByUserAndPlace(userId: string, placeId: string): Promise<Booking | null>;
    getBookingByUserPlaceAndDate(userId: string, placeId: string, date: Date): Promise<Booking | null>;
    getBookingByUserPlaceAndStatus(userId: string, placeId: string, status: string): Promise<Booking[]>;
    getBookingByUserPlaceAndDateRange(userId: string, placeId: string, startDate: Date, endDate: Date): Promise<Booking[]>;
    getBookingByUserPlaceAndStatusAndDateRange(userId: string, placeId: string, status: string, startDate: Date, endDate: Date): Promise<Booking[]>;
    getBookingByUserPlaceAndConfirmationCode(userId: string, placeId: string, confirmationCode: string): Promise<Booking | null>;
    getBookingByUserPlaceAndPaymentId(userId: string, placeId: string, paymentId: string): Promise<Booking | null>;
    getBookingByUserPlaceAndRescheduleId(userId: string, placeId: string, rescheduleId: string): Promise<Booking | null>;
    getBookingByUserPlaceAndConfirmationCodeAndDate(userId: string, placeId: string, confirmationCode: string, date: Date): Promise<Booking | null>;
    getBookingByUserPlaceAndTransactionIdAndDate(userId: string, placeId: string, transactionId: string, date: Date): Promise<Booking | null>;
    getBookingByUserPlaceAndPaymentIdAndDate(userId: string, placeId: string, paymentId: string, date: Date): Promise<Booking | null>;
    getBookingByUserPlaceAndCancellationIdAndDate(userId: string, placeId: string, cancellationId: string, date: Date): Promise<Booking | null>;
    getBookingByUserPlaceAndRescheduleIdAndDate(userId: string, placeId: string, rescheduleId: string, date: Date): Promise<Booking | null>;



}