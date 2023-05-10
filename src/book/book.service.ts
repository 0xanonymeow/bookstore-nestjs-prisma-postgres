import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { paginateResponse } from 'src/lib/utils'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.prisma.book.create({ data: createBookDto })
    return book
  }

  async findAll(query) {
    const take = query.take || 10
    const page = query.page || 1
    const skip = (page - 1) * take

    const book = await this.prisma.$transaction([
      this.prisma.book.findMany({
        take: take,
        skip: skip,
        orderBy: {
          id: 'asc',
        },
      }),
      this.prisma.book.count(),
    ])

    return paginateResponse(book, page, take)
  }

  find(id: number) {
    const book = this.prisma.book.findUnique({ where: { id } })
    return book
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const book = this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      })
      return book
    } catch (e) {
      console.log(e instanceof Prisma.PrismaClientKnownRequestError)
    }
  }

  async remove(id: number) {
    const book = this.prisma.book.delete({ where: { id } })
    return book
  }
}
