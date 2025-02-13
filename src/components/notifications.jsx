// NotificationMenu.js
import { Menu, MenuItem, Typography, Box } from '@mui/material';

const NotificationMenu = ({ anchorEl, onClose, notifications }) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <MenuItem key={notif.id}>
            <Box>
              <Typography variant='body2'>{notif.message}</Typography>
              <Typography variant='caption' color='gray'>
                {notif.time}
              </Typography>
            </Box>
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>
          <Typography variant='body2'>No new notifications</Typography>
        </MenuItem>
      )}
    </Menu>
  );
};

export default NotificationMenu;
