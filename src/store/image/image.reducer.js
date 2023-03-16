import { IMAGE_ACTION_TYPES } from "./image.types";

const INITIAL_STATE = {
    image: null
}

export const imageReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case IMAGE_ACTION_TYPES.SET_IMAGE:
            return {...state, image: payload};
        default:
            return state;
    }
}