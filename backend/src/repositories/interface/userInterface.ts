import {Prisma, User} from "@/generated/prisma";

export interface UserInterface{
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    
    findUserById(id: string): Promise<User | null>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    deleteUser(id: string): Promise<User>;

    listUsers(): Promise<User[]>;
    listUsersPaginated(skip: number, take: number): Promise<User[]>;
    countUsers(): Promise<number>;

    searchUsersByName(keyword: string): Promise<User[]>;
    changeUserPassword(id: string, newPassword: string): Promise<User>;

}