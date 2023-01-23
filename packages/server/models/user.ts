import {
  Model,
  AllowNull as AllowNull_dc,
  AutoIncrement as AutoIncrement_dc,
  Column as Column_dc,
  DataType as DataType_dc,
  PrimaryKey as PrimaryKey_dc,
  Table as Table_dc,
  IsEmail as IsEmail_dc,
  Unique as Unique_dc,
} from 'sequelize-typescript'
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize/types/model'

@Table_dc({
  timestamps: false,
  tableName: 'users',
})
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @AutoIncrement_dc
  @PrimaryKey_dc
  @Column_dc(DataType_dc.INTEGER)
  override id!: CreationOptional<number>

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  firstName!: string

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  lastName!: string

  @AllowNull_dc(false)
  @Unique_dc
  @IsEmail_dc
  @Column_dc(DataType_dc.STRING)
  email!: string
}

export default User
