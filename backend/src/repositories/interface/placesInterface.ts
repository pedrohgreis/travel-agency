import {Prisma, Destiny} from "@/generated/prisma";

export interface PlacesInterface{
    createPlace(data: Prisma.DestinyCreateInput): Promise<Destiny>;

    findPlaceById(id:string): Promise<Destiny | null>;
    findPlaceByName(name:string): Promise<Destiny | null>;

    updatePlaceById(id:string, data: Prisma.DestinyUpdateInput): Promise<Destiny>;
    deletePlaceById(id:string): Promise<Destiny>;

    findPlacesByPriceRange(min:number, max:number): Promise<Destiny[]>;
    searchPlacesByDescription(keyword:string): Promise<Destiny[]>;
    countPlaces(): Promise<number>; // Returns the total number of places
    listPlacesPaginated(skip: number, take: number): Promise<Destiny[]>; // Returns a paginated list of places

    listPlaces(): Promise<Destiny[]>;

    

}