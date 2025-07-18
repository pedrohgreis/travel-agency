import { UserInterface } from "@/repositories/interface/userInterface";
import { Prisma, User } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";



class UserRepository implements UserInterface {

    async createUser(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
        })

        return user;
    }

    async findUserByEmail(email:string){
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        return user;
    }

    async findUserById(id:string){
        const user = await prisma.user.findUnique({
            where: {
                id,
            }
        })

        return user;
    }

    async updateUser(id:string, data: Prisma.UserUpdateInput){
        const user = await prisma.user.update({
            where:{
                id,
            },

            data,
        })

        return user;
    }

    async deleteUser(id:string){
        const user = await prisma.user.delete({
            where: {
                id,
            }
        })

        return user;
    }

    async listUsers(){
        const user = await prisma.user.findMany();

        return user;
    }

    async listUsersPaginated(skip: number, take: number){
        const user = await prisma.user.findMany({
            skip,
            take,
        })

        return user;
    }

    async countUsers(){
        const countUsers = await prisma.user.count();
        return countUsers;
    }

    async searchUsersByName(keyword: string){
        const user = await prisma.user.findMany({
            where: {
                name: {
                    contains: keyword,
                    mode: 'insensitive', // Ignores uppercase and lowercase
                }
            }
        })

        return user;
    }

    async changeUserPassword(id: string, newPassword: string){
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const changeUserPassword = await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        })

        return changeUserPassword;
    }
}