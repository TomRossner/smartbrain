import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {setUser} = useAuth();

    useEffect(() => {
        dispatch(setUser(null));
        navigate("/");
    }, []);
    
  return null;
}

export default Logout;