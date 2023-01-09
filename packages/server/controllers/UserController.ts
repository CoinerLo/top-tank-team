import type Express from 'express'
import type { UserType } from '../typings'
import UserService from '../services/UserService'
import type { TypedRequestBody, TypedRequestQuery } from '../typings'

export class UserController {
  public static addUser = async (
    req: TypedRequestBody<UserType>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await UserService.addUser(data)
    res.end(JSON.stringify({ databaseIdStatus: result.dataValues.id }))
  }

  public static findUser = async (
    req: TypedRequestQuery<UserType>,
    res: Express.Response
  ) => {
    const data = req.query
    const result = await UserService.findUser(data)
    if (!result) {
      res.status(404).json({ databaseIdStatus: 'Not found' })
    } else {
      res.end(
        JSON.stringify({
          databaseIdStatus: result.dataValues.id,
        })
      )
    }
  }

  public static findOrCreateUser = async (
    req: TypedRequestBody<UserType>,
    res: Express.Response
  ) => {
    const data = req.body
    const user = await UserService.findOrCreateUser(data)
    res.end(JSON.stringify({ databaseIdStatus: user.dataValues.id }))
  }
}
