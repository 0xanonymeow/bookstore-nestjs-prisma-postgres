import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
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

  findAll() {
    const book = this.prisma.book.findMany()
    return book
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
