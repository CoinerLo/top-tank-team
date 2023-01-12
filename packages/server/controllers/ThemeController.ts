import type Express from 'express'
import type {
  CreateRequest,
  FindRequest,
  TypedRequestBody,
  TypedRequestQuery,
} from '../typings'
import ThemeService from '../services/ThemeService'

export class ThemeController {
  public static findOrCreateUserTheme = async (
    req: TypedRequestBody<CreateRequest>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await ThemeService.findOrCreate(data)
    res.end(JSON.stringify({ databaseThemeStatus: result.dataValues.theme }))
  }

  public static findUserTheme = async (
    req: TypedRequestQuery<FindRequest>,
    res: Express.Response
  ) => {
    const data = req.query
    const result = await ThemeService.find(data)
    if (!result) {
      res.status(404).json({ databaseThemeStatus: 'Not found' })
    } else {
      res.end(
        JSON.stringify({
          databaseThemeStatus: result.dataValues.id,
        })
      )
    }
  }

  public static updateUserTheme = async (
    req: TypedRequestBody<CreateRequest>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await ThemeService.update(data)
    res.end(JSON.stringify({ databaseThemeStatus: result?.dataValues.theme }))
  }
}
