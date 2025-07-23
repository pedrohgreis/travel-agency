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

    async findBookingById(id: string){
        const book = await prisma.booking.findUnique({
            where: {
                id,
            }
        })

        return book;
    }

    async findBookingsByUserId(userId: string){
        const book = await prisma.booking.findMany({
            where: {
                userId,
            },
            include: {
                user: true,
            }
        })

        return book;
    }

    async updateBookingById(id:string, data: Prisma.BookingUpdateInput){
        const book = await prisma.booking.update({
            where: {
                id,
            },

            data,
        })

        return book;
    }


    async deleteBookingById(id: string){
        const book = await prisma.booking.delete({
            where: {
                id,
            }
        })

        return book;
    }

    async countBookings(){
        const book = await prisma.booking.count();

        return book;
    }

    async listBookingsPaginated(skip: number, take: number){
        const book = await prisma.booking.findMany({
            skip,
            take,
        })

        return book;
    }

    async searchBookingsByUserName(name: string) {
        const book = await prisma.booking.findMany({
            where: {
                user: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            },
            include: {
                user: true
            }
        });

        return book;
    }

    async searchBookingsByPlaceName(keyword: string) {
        const bookings = await prisma.booking.findMany({
            where: {
                destiny: {
                    name: {
                        contains: keyword,
                        mode: 'insensitive'
                    }
                }
            },
            include: {
                destiny: true // se quiser retornar os dados do destino junto
            }
        });

        return bookings;
    }

    async confirmBooking(id: string){
        const book = await prisma.booking.findUnique({
            where: {
                id,
            }
        })

        return book;
    }

    async  rescheduleBooking(id: string, newBookingDate: Date){
        const book = await prisma.booking.update({
            where: {
                id,
            },

            data: {
                bookingDate: newBookingDate,
            }
        })

        return book;
    }

}