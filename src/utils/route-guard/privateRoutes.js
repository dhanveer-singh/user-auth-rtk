import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state?.authSlice);
  const { token } = auth;

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [token, dispatch, navigate]);

  return children;
};

export default PrivateRoute;
