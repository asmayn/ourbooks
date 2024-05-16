import { ApiProperty } from '@nestjs/swagger';
import {
  IsBtcAddress,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
  IsStrongPasswordOptions,
} from 'class-validator';
import { Address } from 'cluster';

export class CreateDonateDto {
  @ApiProperty()
  @IsNotEmpty()
  postDate: String;

  @ApiProperty()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty()
  @IsNotEmpty()
  donateId: number;

  @ApiProperty()
  recieverId: number;

  @ApiProperty()
  shippingDate: String;

  @ApiProperty()
  receivedDate: String;
}
