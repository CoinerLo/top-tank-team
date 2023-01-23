import type Express from 'express'
import type { UpdateUserType, UserType } from '../typings'
import UserService from '../services/UserService'
import type { TypedRequestBody, TypedRequestQuery } from '../typings'

export class UserController {
  public static addUser = async (
    req: TypedRequestBody<UserType>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await UserService.create(data)
    res.end(JSON.stringify({ databaseUserStatus: result.dataValues.id }))
  }

  public static findUser = async (
    req: TypedRequestQuery<UserType>,
    res: Express.Response
  ) => {
    const data = req.query
    const result = await UserService.find(data)
    if (!result) {
      res.status(404).json({ databaseUserStatus: 'Not found' })
    } else {
      res.end(
        JSON.stringify({
          databaseUserStatus: result.dataValues.id,
        })
      )
    }
  }

  public static findOrCreateUser = async (
    req: TypedRequestBody<UserType>,
    res: Express.Response
  ) => {
    const data = req.body
    const user = await UserService.findOrCreate(data)
    res.end(JSON.stringify({ databaseUserStatus: user.dataValues.id }))
  }

  public static updateUser = async (
    req: TypedRequestBody<UpdateUserType>,
    res: Express.Response
  ) => {
    const { id, userData } = req.body
    const result = await UserService.update(id, userData)
    res.end(JSON.stringify({ databaseUserStatus: result?.dataValues.id }))
  }
}
