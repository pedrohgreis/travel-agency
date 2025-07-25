import {it, describe, expect, beforeEach} from "vitest";
import { UserServiceRegister } from "../user/registerUser";
import { InMemmoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "../Errors/user-already-exists";

describe("Get Register", () => {

    let userRepository: InMemmoryUsersRepository
    let sut: UserServiceRegister

    beforeEach(() => {
        userRepository = new InMemmoryUsersRepository();
        sut = new UserServiceRegister();
    })

    it("It hash password", async () => {

        const {user} = await sut.register({
            name: "Jhon",
            email: "jhon@gmail.com",
            password: "123456"
        })

        const hashedPassword = await compare('123456', user.password);

        expect(hashedPassword).toBe(true); 
    })

    it("It should not be able to register the same email twice", async () => {
        const email = "john@gmail.com";

        await expect(
            sut.register({
                name: "Jhon",
                email: email,
                password: "123456"
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

    it("shuld be able to register", async () => {

        const {user} = await sut.register({
            name: "Jhon",
            email: "jhon@gmail.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String));
    })
})