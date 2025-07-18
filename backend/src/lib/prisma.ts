import {env} from "@/env";
import { PrismaClient } from "@/generated/prisma";

// Cria uma instância do PrismaClient com as configurações apropriadas
// O PrismaClient é usado para interagir com o banco de dados
export const prisma = new PrismaClient({
    // O log serve para mostrar as queries no ambiente de desenvolvimento, ou seja, quando NODE_ENV for 'dev'
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
})