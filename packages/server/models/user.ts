/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize/types/model'

@Table({
  timestamps: false,
  tableName: 'users',
})
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: CreationOptional<number>

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string
}

export default User
