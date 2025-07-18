import { BookingInterface } from "../interface/bookinginterfaces";
import { Prisma, Booking } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

class BookingRepository implements BookingInterface{
    async createBooking(data: Prisma.BookingCreateInput){
        const book = await prisma.booking.create({
            data,
        })

        return book;
    }

    //todo: Implement the rest of the methods
}