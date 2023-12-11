import { ApiProperty } from "@nestjs/swagger";
import { IsBtcAddress, IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword, IsStrongPasswordOptions } from "class-validator";
import { Address } from "cluster";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;
}
