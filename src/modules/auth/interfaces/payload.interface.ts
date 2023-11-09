import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export interface JwtPayloadInterface {
    usr_id: string;
}