import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;
    
  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
