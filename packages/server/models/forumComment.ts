import {
  Model,
  AllowNull as AllowNull_dc,
  AutoIncrement as AutoIncrement_dc,
  Column as Column_dc,
  DataType as DataType_dc,
  PrimaryKey as PrimaryKey_dc,
  Table as Table_dc,
} from 'sequelize-typescript'
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize/types/model'

@Table_dc({
  timestamps: false,
  tableName: 'forum_comment',
})
class forumComment extends Model<
  InferAttributes<forumComment>,
  InferCreationAttributes<forumComment>
> {
  @AutoIncrement_dc
  @PrimaryKey_dc
  @Column_dc(DataType_dc.INTEGER)
  override id!: CreationOptional<number>

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.INTEGER)
  contextId!: number

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.INTEGER)
  parentId!: number

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  postAuthor!: string

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  postDate!: string

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  comment!: string
}

export default forumComment
