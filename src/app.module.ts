import { Module } from '@nestjs/common'
import { BookModule } from './book/book.module'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), BookModule, PrismaModule],
  controllers: [],
})
export class AppModule {}
