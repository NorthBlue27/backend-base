import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRolesTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  tip_rol_des: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  flag: boolean;
}
