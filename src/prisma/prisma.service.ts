import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['info', 'warn'],
      datasources: {
        db: {
          url: process.env.POSTGRES_PRISMA_URL,
        },
      },
    })
  }
}
