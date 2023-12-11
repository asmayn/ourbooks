import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class ActionResponseDto {
    @ApiProperty()
    message: string;

    @ApiProperty()
    user: User;
}