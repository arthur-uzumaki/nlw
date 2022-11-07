import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
const prisma = new PrismaClient({
    log:['query'],
    
})
async function bootstrop(){
    const fastify = Fastify({
        logger: true,
    })
    
    await fastify.register(cors , {
        origin: true,
    })
    fastify.get('/pools/count',async () =>{

        const count =  await prisma.pool.count()

        return {count}
    })
    fastify.get('/users/count',async () =>{

        const count =  await prisma.user.count()

        return {count}
    })
    fastify.get('/guesses/count',async () =>{

        const count =  await prisma.guess.count()

        return {count}
    })


    fastify.post('/pools',async (request , reply) =>{
        const createPoolBody = z.object({
            title: z.string(),
        })

       
    
        const {title} = createPoolBody.parse(request.body)
        const generate = new ShortUniqueId({length: 6})
        const code =  String(generate()).toUpperCase()
        await prisma.pool.create({

            data:{
                title,
                code
            }
        })
        return reply.status(201).send({code})
      
       
       
        //return {title}
    })

   await fastify.listen({port: 3333}) 
}
bootstrop()