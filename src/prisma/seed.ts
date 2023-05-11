import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { map } from 'lodash'

const prisma = new PrismaClient()

const main = async () => {
  const response = await Promise.all(
    map([
      ...Array(30),
      async (_: undefined, i: number) =>
        await prisma.book.upsert({
          where: {},
          update: {},
          create: {
            title: faker.random.words(5),
            author: faker.name.fullName(),
            price: parseFloat(faker.commerce.price(10, 100, 2)),
            img_id: i,
          },
        }),
    ]),
  )
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
