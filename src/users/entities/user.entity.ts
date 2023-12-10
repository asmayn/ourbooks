import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPasswordOptions } from "class-validator";
import { Address } from "cluster";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstname: string;

    @ApiProperty()
    @Column()
    lastname: string;

    @ApiProperty()
    @Column({
        unique: true
    })
    email: string;

    @ApiProperty()
    @Column({
        type: 'text'
    })
    password: string;

    @ApiProperty()
    @Column()
    phone: number;

}
