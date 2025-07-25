import { Prisma, User } from "@/generated/prisma";
import { UserRepository } from "../prisma/userRepository";
import bcrypt from "bcryptjs/umd/types";

// The in-memory user repository is mainly used for testing,
// where we don't want to interact with a real database but simulate the behavior instead.

export class InMemmoryUsersRepository implements UserRepository{
    public items: User[] = []; // Used to store users in memory.

    private findUserBy<K extends keyof User>(key: K, value: User[K]): User | null {
        return this.items.find(user => user[key] === value) || null;
    }
    

    async findUserByEmail(email: string) {
        return this.findUserBy("email", email)
    }

    async findUserById(id: string){
        return this.findUserBy("id",id);
    }

    async updateUser(id: string, data: Partial<User>){
        const user = this.findUserBy("id", id);

        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        const existingUser: User = {
            id: data.id ?? user.id,
            email: data.email ?? user.email,
            name: data.name ?? user.name,
            password: data.password ?? user.password,
            createdAt: data.createdAt ?? user.createdAt
        };

        const index = this.items.findIndex(user => user.id === id);
        this.items[index] = existingUser;

        return existingUser;
    }

    async deleteUser(id:string){
        const user = this.findUserBy("id",id);

        if(!user){
            throw new Error("Id not found");
        }

        const index = this.items.findIndex(user => user.id === id);
        const [deletedUser] = this.items.splice(index,1);

        return deletedUser;
    }


    async listUsers():Promise<User[]> {
        return this.items;
    }

    async listUsersPaginated(skip: number, take: number){
        const users = this.items;

        const paginated = users.slice(skip,skip + take);

        return paginated;
    }

    async countUsers(){
        const user = this.items;

        return user.length;
    }

    async searchUsersByName(keyword:string){
        const users = this.items;
        const filterUser = users.filter((user) => {
            user.name.toLowerCase().includes(keyword.toLowerCase());
        })

        return filterUser;

    }

    async changeUserPassword(id: string, newPassword: string){
        const user = this.findUserBy("id",id);

        if(!user){
            throw new Error(`User with id ${id} not found`);
        }

        const hashedPassword = await bcrypt.hash(newPassword,12);
        user.password = hashedPassword;
        
        return user;
    }


    async createUser(data:Prisma.UserCreateInput){
        const user = {
            id: "user-1",
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: data.createdAt instanceof Date
                ? data.createdAt
                : data.createdAt
                    ? new Date(data.createdAt)
                    : new Date()
        };

        this.items.push(user);

        return user;
    }


}