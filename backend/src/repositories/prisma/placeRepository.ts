import { PlacesInterface } from "../interface/placesInterface";
import { Prisma, Destiny } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";


class PlaceRepository implements PlacesInterface{

    async createPlace(data: Prisma.DestinyCreateInput){
        const place = await prisma.destiny.create({
            data,
        });

        return place;
    }

    async findPlaceById(id:string){
        const place = await prisma.destiny.findUnique({
            where: {
                id,
            }
        })

        return place;
    }

    async findPlaceByName(name:string){
        const place = await prisma.destiny.findUnique({
            where: {
                name,
            }
        })

        return place;
    }

    async  updatePlaceById(id:string, data: Prisma.DestinyUpdateInput){
        const place = await prisma.destiny.update({
            where: {
                id,
            },

            data,
        })

        return place;
    }

    async deletePlaceById(id:string){
        const place = await prisma.destiny.delete({
            where: {
                id,
            }
        })

        return place;
    }

    async findPlacesByPriceRange(min:number, max:number){
        const places = await prisma.destiny.findMany({
            where: {
                price: {
                    gte: min, // price greater than or equal to min
                    lte: max, // price less than or equal to max
                }
            }
        })

        return places;
    }

    async searchPlacesByDescription(keyword:string){
        const places = await prisma.destiny.findMany({
            where: {
                description:{
                    contains: keyword, // search for places with description containing the keyword
                    mode: 'insensitive', // case insensitive search
                }
            }
        })

        return places;
    }

    async countPlaces(){
        const counstPlaces = await prisma.destiny.count();
        return counstPlaces;
    }

    async listPlacesPaginated(skip: number, take: number){
        const places = await prisma.destiny.findMany({
            skip,
            take,
        })

        return places;
    }

    async listPlaces(){
        const places = await prisma.destiny.findMany();
        return places;
    }
}