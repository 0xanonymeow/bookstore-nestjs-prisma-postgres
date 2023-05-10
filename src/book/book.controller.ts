import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

interface Pagination {
  take?: number
  page?: number
}

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto)
  }

  @Get()
  findAll(@Query() query: Pagination) {
    return this.bookService.findAll(query)
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.bookService.find(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id)
  }
}
