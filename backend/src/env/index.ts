import 'dotenv/config';
import {z} from 'zod';

//Validando as env
const schema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
})

// Faz a validação das variáveis de ambiente
// e retorna um objeto com os valores validados ou um erro
const _env = schema.safeParse(process.env); 

if(_env.success === false){
    console.error('Invalid environment variables:', _env.error.format);
    throw new Error('Invalid environment variables');
}

export const env = _env.data;