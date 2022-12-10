import {RouterState} from "connected-react-router";
import { NameSpace } from "../utils/consts";
import initialDecksState from "./slices/decksSlice/decksSlice";
import initialGameState from "./slices/gameSlice/gameSlice";
import initialUserState from "./slices/userSlice/userSlice";

export const getInitialState = (pathname = '/') => {
    return {
        [NameSpace.User]: initialUserState,
        [NameSpace.Decks]: initialDecksState,
        [NameSpace.Game]: initialGameState,
        router: {
          location: { pathname, search: '', hash: '', key: '' },
          action: 'POP',
        } as unknown as RouterState,
    };
};