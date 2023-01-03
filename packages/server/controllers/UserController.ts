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
    console.log(result.dataValues)
    res.end(JSON.stringify({ databaseIdStatus: result.dataValues.id }))
  }

  public static findUser = async (
    req: TypedRequestQuery<UserType>,
    res: Express.Response
  ) => {
    const data = req.query
    const result = await UserService.findUser(data)
    console.log(result && result.dataValues)
    res.end(
      JSON.stringify({
        databaseIdStatus: result ? result.dataValues.id : 'Not found',
      })
    )
  }
}
