import { UserRepository } from "@/repositories/prisma/userRepository";

class UserServiceDelete{
    private user = new UserRepository();

    async deleteUser (data: {name:string, email: string, password: string}){
        
    }


}