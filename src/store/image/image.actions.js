import { IMAGE_ACTION_TYPES } from "./image.types";
import { createAction } from "../utils";

export const setImageUrl = (imageUrl) => {
    return createAction(IMAGE_ACTION_TYPES.SET_IMAGE_URL, imageUrl);
}