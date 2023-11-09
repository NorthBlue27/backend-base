import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  schema: 'sistema',
  tableName: 'user',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model<User> {
  @ApiProperty()
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  usr_id: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  usr_email: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  usr_password: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  usr_name: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usr_roles: number;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  flag: boolean;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeCreate(instance: User, options: any) {
    instance.usr_email = instance.usr_email.trim().toLowerCase();
  }
}
