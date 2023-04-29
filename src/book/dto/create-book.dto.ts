import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  author: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  createdAt: Date

  updatedAt: Date
}
