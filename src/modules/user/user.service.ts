import { db } from "../../../utils/prisma";
import { CreateUserInput } from "./user.schema";
import { hashPassword } from "../../../utils/hash";


export async function createUser(input: CreateUserInput) {

    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password);

    const user = await db.users.create({
        data: {...rest, salt, password: hash}
    });

    return user;
}

export async function findUserByEmail(email: string) {
    return db.users.findUnique({
        where: {
            email
        }
    })
};

export async function getUsers() {
    return db.users.findMany({
        select: {
            id: true,
            full_name: true,
            username: true,
            email: true,
        }
    });
}