import { IMAGE_ACTION_TYPES } from "./image.types";
import { createAction } from "../utils";

export const setImage = (image) => {
    return createAction(IMAGE_ACTION_TYPES.SET_IMAGE, image);
}