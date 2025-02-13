import { useState } from 'react';

import {
  Dashboard,
  Settings,
  ExpandLess,
  ExpandMore,
  Close,
  Person,
} from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detect mobile screens

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={toggleSidebar}
      ModalProps={{ keepMounted: true }}
      hideBackdrop={false}
      sx={{
        zIndex: 1301,
        width: isOpen ? 260 : isMobile ? 0 : 80,
        flexShrink: 0,
        transition: 'width 0.3s ease-in-out',
        '& .MuiDrawer-paper': {
          width: isOpen ? 260 : isMobile ? 0 : 80,
          transition: 'width 0.3s ease-in-out',
          boxSizing: 'border-box',
          border: 0,
          height: '100vh',
          overflowX: 'hidden',
          zIndex: 1301,
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: 64,
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'space-between' : 'center',
        }}
      >
        {isOpen ? (
          <Typography variant='h6' fontWeight='bold'>
            User Auth
          </Typography>
        ) : (
          <Typography variant='h6' fontWeight='bold'>
            UA
          </Typography>
        )}
        {isMobile && isOpen && (
          <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        )}
      </Box>

      <List
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <ListItemButton
          sx={{ justifyContent: isOpen ? 'flex-start' : 'center' }}
          component={Link}
          to='/dashboard'
        >
          <ListItemIcon sx={{ minWidth: isOpen ? 40 : 'auto' }}>
            <Dashboard />
          </ListItemIcon>
          {isOpen && <ListItemText primary='Dashboard' />}
        </ListItemButton>
        <ListItemButton
          sx={{ justifyContent: isOpen ? 'flex-start' : 'center' }}
          component={Link}
          to='/users'
        >
          <ListItemIcon sx={{ minWidth: isOpen ? 40 : 'auto' }}>
            <Person />
          </ListItemIcon>
          {isOpen && <ListItemText primary='Dashboard' />}
        </ListItemButton>

        <ListItemButton
          sx={{ justifyContent: isOpen ? 'flex-start' : 'center' }}
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <ListItemIcon sx={{ minWidth: isOpen ? 40 : 'auto' }}>
            <Settings />
          </ListItemIcon>
          {isOpen && <ListItemText primary='Settings' />}
          {isOpen && (openDropdown ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        <Collapse in={openDropdown} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton
              component={Link}
              to='/settings/account'
              sx={{ pl: 4 }}
            >
              <ListItemText primary='Account' />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to='/settings/security'
              sx={{ pl: 4 }}
            >
              <ListItemText primary='Security' />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
