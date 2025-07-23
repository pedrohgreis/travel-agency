import {UserRepository} from '@/repositories/prisma/userRepository'
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '../Errors/user-already-exists';

class UserServiceRegister {
    private user = new UserRepository();

    async register(data: {name:string, email: string, password:string}){

        //* Take out all the empty spaces
        const name = data.name.trim();
        const email = data.email.toLowerCase().trim();

        //* Verify if email exists
        const userEmail = await this.user.findUserByEmail(email);


        if(userEmail){
            throw new UserAlreadyExistsError();
        }

        //* Hash of the password
        const password = await hash(data.password, 12);

        //* Save in the databases
        await this.user.createUser({
            name: name,
            email: email,
            password: password
        })
    }
}