import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { map } from 'lodash'

const prisma = new PrismaClient()

const main = async () => {
  const isEmpty = await prisma.book.findUnique({
    where: {
      id: 0,
    },
  })

  if (!!isEmpty) return

  const response = await Promise.all(
    map(
      [...Array(30)],
      async (_: undefined, i: number) =>
        await prisma.book.create({
          data: {
            title: faker.random.words(5),
            author: `${faker.name.firstName()} ${faker.name.lastName()}`,
            price: parseFloat(faker.commerce.price(10, 100, 2)),
            img_id: i + 1,
          },
          select: {
            id: true,
          },
        }),
    ),
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
