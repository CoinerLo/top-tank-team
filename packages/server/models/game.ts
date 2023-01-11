import {
  Model,
  AllowNull as AllowNull_dc,
  AutoIncrement as AutoIncrement_dc,
  Column as Column_dc,
  DataType as DataType_dc,
  PrimaryKey as PrimaryKey_dc,
  Table as Table_dc,
  ForeignKey as ForeignKey_dc,
  Index as Index_dc,
} from 'sequelize-typescript'
import User_dc from './user'

@Table_dc({
  timestamps: false,
  tableName: 'games',
})
class Game extends Model<Game> {
  @AutoIncrement_dc
  @PrimaryKey_dc
  @Column_dc(DataType_dc.INTEGER)
  override id!: number

  @Index_dc
  @AllowNull_dc(false)
  @Column_dc(DataType_dc.STRING)
  game!: string

  @ForeignKey_dc(() => User_dc)
  @AllowNull_dc(false)
  @Column_dc({
    type: DataType_dc.INTEGER,
    field: 'gamer_id',
  })
  gamerId!: number
}

export default Game
