import { useDispatch, useSelector } from "react-redux"
import { selectIsAuthenticated, selectUser } from "../store/auth/auth.selectors"
import { setUser } from "../store/auth/auth.actions";
import { register, login } from "../http/requests";

const useAuth = () => {
    const currentUser = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    const loadUser = (data) => {
        return dispatch(setUser(data));
    }

    const loginUser = async (credentials) => {
        const user = await login(credentials);
        return loadUser(user);
    }

    const registerUser = async (data) => {
        return await register(data);
    }

  return {
    currentUser,
    setUser,
    loadUser,
    loginUser,
    registerUser,
    isAuthenticated
  }
}

export default useAuth;