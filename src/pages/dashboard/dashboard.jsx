import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearUser } from '@/services/auth/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(clearUser());
    // localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <>
      <div>Dashboard</div>
      <Button variant='outlined' color='secondary' onClick={handleLogout}>
        Sign Out
      </Button>
    </>
  );
};

export default Dashboard;
