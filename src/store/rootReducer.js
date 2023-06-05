import { combineReducers } from "redux";
import { authReducer } from "./auth/auth.reducer";
import { imageReducer } from "./image/image.reducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    image: imageReducer
})