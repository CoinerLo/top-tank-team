import {
  Model,
  AllowNull as AllowNull_dc,
  AutoIncrement as AutoIncrement_dc,
  Column as Column_dc,
  DataType as DataType_dc,
  PrimaryKey as PrimaryKey_dc,
  ForeignKey as ForeignKey_dc,
  Table as Table_dc,
  BelongsTo as BelongsTo_dc,
} from 'sequelize-typescript'
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize/types/model'
import ForumTopic_dc from './forumTopic'

@Table_dc({
  timestamps: false,
  tableName: 'forum_comment',
})
class ForumComment extends Model<
  InferAttributes<ForumComment>,
  InferCreationAttributes<ForumComment>
> {
  @AutoIncrement_dc
  @PrimaryKey_dc
  @Column_dc(DataType_dc.INTEGER)
  override id!: CreationOptional<number>

  @ForeignKey_dc(() => ForumTopic_dc)
  @AllowNull_dc(false)
  @Column_dc({
    type: DataType_dc.INTEGER,
    field: 'context_id',
  })
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

  @BelongsTo_dc(() => ForumTopic_dc)
  topic!: ForumTopic_dc
}

export default ForumComment
