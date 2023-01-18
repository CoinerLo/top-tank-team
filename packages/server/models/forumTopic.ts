import {
  Model,
  AllowNull as AllowNull_dc,
  AutoIncrement as AutoIncrement_dc,
  Column as Column_dc,
  DataType as DataType_dc,
  PrimaryKey as PrimaryKey_dc,
  Table as Table_dc,
  HasMany as HasMany_dc,
} from 'sequelize-typescript'
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize/types/model'
import ForumComment_dc from './forumComment'

@Table_dc({
  timestamps: false,
  tableName: 'forum_topic',
})
class ForumTopic extends Model<
  InferAttributes<ForumTopic>,
  InferCreationAttributes<ForumTopic>
> {
  @AutoIncrement_dc
  @PrimaryKey_dc
  @Column_dc(DataType_dc.INTEGER)
  override id!: CreationOptional<number>

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  title!: string

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  authorName!: string

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.INTEGER)
  repliesCount!: number

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  lastReplied!: string

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  lastRepliedDate!: string

  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  dateTopic!: string

  @HasMany_dc(() => ForumComment_dc)
  comments!: ForumComment_dc[]
}

export default ForumTopic
