import { useSelector } from "react-redux";
import { selectImageUrl } from "../store/image/image.selectors";
import { setImageUrl } from "../store/image/image.actions";

const useImage = () => {
    const imageUrl = useSelector(selectImageUrl);
    
  return {
    imageUrl,
    setImageUrl
  }
}

export default useImage;