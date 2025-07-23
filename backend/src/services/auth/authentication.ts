import { User } from "@/generated/prisma"
import { UserRepository } from "@/repositories/prisma/userRepository"
import { InvalidCredentialsError } from "../Errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticationUseCaseRequest{
    email: string,
    password:string
}

interface AuthenticationUseCaseResponse{
    user:User
}

class AuthenticationUseCase{
    constructor(
        // Accesess database
        private userRepository: UserRepository
    ){}

    async execute({email,password}:AuthenticationUseCaseRequest):Promise<AuthenticationUseCaseResponse>{
        const user = await this.userRepository.findUserByEmail(email);

        if(!user){
            throw new InvalidCredentialsError();
        }

        //Verifying passwod
        const doesPasswordMatches = await compare(password, user.password);

        return{
            user,
        }
    }
}