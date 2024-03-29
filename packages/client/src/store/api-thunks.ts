import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthController from '../controllers/AuthController'
import {
  ISignInData,
  ISingUpForm,
  OAuthSingIn,
  UserDBType,
  CreateThemeType,
  IChangeDataUser,
  ILeaderAll,
  ILeaderAdd,
  GameDBType,
  PostDBType,
  addCommentDBType,
} from '../typings'
import UserController from '../controllers/UserController'
import { UserAPIUpdatePassword } from '../api/UserAPI'
import OAuthController from '../controllers/OAuthController'
import DatabaseController from '../controllers/DatabaseController'
import { Themes } from '../utils/consts'
import LeaderController from '../controllers/LeaderController'
import DatabaseGameController from '../controllers/DatabaseGameController'

export const loginThunk = createAsyncThunk(
  'user/login',
  async (data: ISignInData, thunkAPI) => {
    await AuthController.signin(data)
    thunkAPI.dispatch(getUserThunk())
  }
)

export const signUpThunk = createAsyncThunk(
  'user/signUp',
  async (data: ISingUpForm) => {
    const res = await AuthController.signup(data)
    return res.data
  }
)

export const getYandexIdThunk = createAsyncThunk(
  'user/getYandexId',
  async (data: string) => {
    const res = await OAuthController.getYandexId(data)
    return res.data
  }
)

export const signinYandexThunk = createAsyncThunk(
  'user/signinYandex',
  async (data: OAuthSingIn, thunkAPI) => {
    await OAuthController.signinYandex(data)
    thunkAPI.dispatch(getUserThunk())
  }
)

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async (_, thunkAPI) => {
    const res = await AuthController.fetchUser()
    const resUserDB = await DatabaseController.findOrCreateUserInDB({
      firstName: res.data.first_name,
      lastName: res.data.second_name,
      email: res.data.email,
    })
    const resThemeDB = await DatabaseController.findOrCreateUserThemeInDB({
      ownerId: Number(resUserDB.data.databaseUserStatus),
      theme: Themes.dark,
    })
    thunkAPI.dispatch(
      findAllGamesInDBThunk(Number(resUserDB.data.databaseUserStatus))
    )
    return { ...res.data, ...resUserDB.data, ...resThemeDB.data }
  }
)

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  await AuthController.logout()
})

export const updateProfileThunk = createAsyncThunk(
  'user/updateProfile',
  async ({ data, databaseId }: IChangeDataUser) => {
    const res = await UserController.updateProfile(data)
    const { email, first_name, second_name } = data
    const userData: UserDBType = {
      email: email,
      firstName: first_name,
      lastName: second_name,
    }
    await DatabaseController.updateUserInDB({ id: databaseId, userData })
    return res.data
  }
)

export const updatePasswordThunk = createAsyncThunk(
  'user/updatePassword',
  async (data: UserAPIUpdatePassword) => {
    const res = await UserController.updatePassword(data)
    return res.data
  }
)

export const updateAvatarThunk = createAsyncThunk(
  'user/updateAvatar',
  async (data: FormData) => {
    const res = await UserController.updateAvatar(data)
    return res.data
  }
)

export const getAllLeaderThunk = createAsyncThunk(
  'leaders/getAllLeader',
  async (data: ILeaderAll) => {
    const res = await LeaderController.getAllLeader(data)
    return res.data
  }
)

export const addLeaderThunk = createAsyncThunk(
  'leaders/addLeader',
  async (data: ILeaderAdd) => {
    const res = await LeaderController.addLeader(data)
    return res.data
  }
)

export const findOrCreateUserThemeInDBThunk = createAsyncThunk(
  'database/findOrCreateUserTheme',
  async (data: CreateThemeType) => {
    const res = await DatabaseController.findOrCreateUserThemeInDB(data)
    return res.data
  }
)

export const updateUserThemeInDBThunk = createAsyncThunk(
  'database/updateUserTheme',
  async (data: CreateThemeType) => {
    const res = await DatabaseController.updateUserTheme(data)
    return res?.data
  }
)

// Метод пока не используется
export const addUserInDBThunk = createAsyncThunk(
  'database/addUser',
  async (data: UserDBType) => {
    const res = await DatabaseController.addUserInDB(data)
    return res.data
  }
)

// Пока этот метод не используется, когда появится в нем потребность
// надо будет реализовать обработку ошибки 404, экстра-редьюсеры и слайс
export const findUserInDBThunk = createAsyncThunk(
  'database/findUser',
  async (data: UserDBType) => {
    const res = await DatabaseController.findUserInDB(data)
    return res.data
  }
)

export const createNewGameInDBThunk = createAsyncThunk(
  'database/createNewGame',
  async (data: Omit<GameDBType, 'id'>) => {
    const res = await DatabaseGameController.createNewGame(data)
    return res.data
  }
)

export const findGameInDBThunk = createAsyncThunk(
  'database/findGame',
  async (id: number) => {
    const res = await DatabaseGameController.findGame(id)
    return res.data
  }
)

export const updateGameInDBThunk = createAsyncThunk(
  'database/updateGame',
  async (data: Omit<GameDBType, 'id'>) => {
    const res = await DatabaseGameController.updateGame(data)
    return res.data
  }
)

export const deleteGameInDBThunk = createAsyncThunk(
  'database/deleteGame',
  async (id: number) => {
    const res = await DatabaseGameController.deleteGame(id)
    return res.data
  }
)

export const findAllGamesInDBThunk = createAsyncThunk(
  'database/findAllGames',
  async (id: number) => {
    const res = await DatabaseGameController.findAllGames(id)
    return res.data
  }
)

export const addPostInDBThunk = createAsyncThunk(
  'database/addPost',
  async ({ topic, comment, authorName }: PostDBType) => {
    const dataTopic = {
      title: topic,
      authorName,
      repliesCount: 0,
      lastReplied: authorName,
      lastRepliedDate: JSON.stringify(new Date()),
      dateTopic: JSON.stringify(new Date()),
    }
    const resTopic = await DatabaseController.addTopicInDB(dataTopic)
    const dataComment = {
      contextId: resTopic.data.databaseTopicStatus.id,
      parentId: 0,
      postAuthor: authorName,
      postDate: resTopic.data.databaseTopicStatus.dateTopic,
      comment: comment,
    }
    const resComment = await DatabaseController.addCommentInDB(dataComment)

    return { ...resTopic.data, ...resComment.data }
  }
)

export const addCommentInDBThunk = createAsyncThunk(
  'database/addComment',
  async ({ id, comment, authorName, parentId }: addCommentDBType) => {
    const resTopic = await DatabaseController.findOneTopicInDB(id)

    const topicData = {
      title: resTopic.data.databaseTopicStatus.title,
      authorName: resTopic.data.databaseTopicStatus.authorName,
      repliesCount: Number(resTopic.data.databaseTopicStatus.repliesCount) + 1,
      lastReplied: authorName,
      lastRepliedDate: JSON.stringify(new Date()),
      dateTopic: resTopic.data.databaseTopicStatus.dateTopic,
    }
    const updateDateTopic = {
      id,
      topicData,
    }
    const updTopic = await DatabaseController.updateTopicInDB(updateDateTopic)

    const dataComment = {
      contextId: resTopic.data.databaseTopicStatus.id as number,
      parentId,
      postAuthor: authorName,
      postDate: JSON.stringify(new Date()) as string,
      comment: comment,
    }
    const resComment = await DatabaseController.addCommentInDB(dataComment)

    return { ...updTopic.data, ...resComment.data }
  }
)

export const findAlltopicInDBThunk = createAsyncThunk(
  'database/findAlltopic',
  async () => {
    const res = await DatabaseController.findAlltopicInDB()
    return res.data
  }
)

export const commentsByTopicInDBThunk = createAsyncThunk(
  'database/commentsByTopic',
  async (id: number) => {
    const res = await DatabaseController.commentsByTopicInDB(id)
    return res.data
  }
)
