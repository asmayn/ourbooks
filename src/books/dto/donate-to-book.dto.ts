import { IsNotEmpty, IsNumber } from "class-validator";

export class DonateToBook {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    bookId: number;
}