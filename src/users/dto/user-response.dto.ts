import { User } from "../entities/user.entity";

export class UserResponse {
    total: number;
    data: User[];
    
}