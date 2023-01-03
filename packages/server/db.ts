import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [__dirname + '/models'],
}

export const sequelize = new Sequelize(sequelizeOptions)

export const dbConnect = async (isDev: boolean) => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: isDev })
    console.log('Connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}
