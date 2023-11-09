import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateRolesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(1)
  usr_email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  tip_rol_des: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  flag?: boolean;
}
