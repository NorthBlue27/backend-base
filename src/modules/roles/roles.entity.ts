import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { RolesType } from '../roles-type/roles-type.entity';

@Table({
  schema: 'sistema',
  tableName: 'roles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Roles extends Model<Roles> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  rol_id: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  rol_usr_id: string;

  @ApiProperty()
  @ForeignKey(() => RolesType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rol_tip_id: number;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  flag: boolean;

  @BelongsTo(() => User, { foreignKey: 'rol_usr_id' })
  user: User;

  @BelongsTo(() => RolesType, { foreignKey: 'rol_tip_id' })
  rolesType: RolesType;
}
