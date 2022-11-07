import { PrismaClient } from '@prisma/client';
import ShortUniqueId from "short-unique-id";

const prisma = new PrismaClient()
async function main(){
  const user = await prisma.user.create({
    data:{
      name: 'Cristiano',
      email: 'cristiano@gmail.com',
      avatarUrl: 'http://github.com/Arttanjeiro.png'
    }
  })
  const generate = new ShortUniqueId({length: 6})
  const code =  String(generate()).toUpperCase()
  const pool = await prisma.pool.create({
    data:{
      title: 'Exemple poll',
      code,
      ownerId: user.id,
      participants: {
        create:{
          userId: user.id,
        }
      }

    }
  })
  await prisma.game.create({
    data:{
      date: '2022-11-03T12:48:03.003Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

    }
  })
  await prisma.game.create({
    data:{
      date: '2022-11-04T12:48:03.003Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'DE',

      gusses: {
        create:{
          firstTeamPoint: 2,
          secondTemPoint: 1,
          participant: {
            connect:{
              userId_poolId:{
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}


main()