import { IMAGE_ACTION_TYPES } from "./image.types";

const INITIAL_STATE = {
    imageUrl: null
}

export const imageReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case IMAGE_ACTION_TYPES.SET_IMAGE_URL:
            return {...state, imageUrl: payload};
        default:
            return state;
    }
}