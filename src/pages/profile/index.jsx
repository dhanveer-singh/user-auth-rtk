import { Avatar, Typography, Box, TextField, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state?.persistedReducer?.auth?.user); // Assuming the user is stored in Redux

  const getAvatarContent = () => {
    return user?.profilePicture ? (
      <img
        src={user.profilePicture}
        alt='Profile'
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
      />
    ) : (
      user?.name?.charAt(0).toUpperCase()
    );
  };

  return (
    <Box>
      <Typography variant='h4' component='h5'>
        Profile
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          mx: 'auto',
          width: 350,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ bgcolor: deepOrange[400], width: 80, height: 80 }}>
          {getAvatarContent()}
        </Avatar>
        <Typography variant='h6' sx={{ marginTop: 2 }}>
          {user?.name}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {user?.email}
        </Typography>
        <Box sx={{ width: '100%', marginTop: 3, textAlign: 'left' }}>
          <TextField
            fullWidth
            label='Full Name'
            variant='outlined'
            value={user?.name || ''}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label='Email Address'
            variant='outlined'
            value={user?.email || ''}
            sx={{ marginBottom: 2 }}
          />
          <Button variant='contained' fullWidth>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
