import { useState } from 'react';

import { ExpandLess, ExpandMore, Close, Security } from '@mui/icons-material';
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
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import HoverTooltip from '../tooltip';
import getSidebarItems from './sidebarItems';
import { flexCenter } from '@/assets/styles/mixins';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [openMenus, setOpenMenus] = useState({});
  const handleToggle = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const sidebarItems = getSidebarItems(t);
  
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
        <HoverTooltip title={'User Auth'}>
          <Box
            sx={{
              ...flexCenter,
              gap: 2,
            }}
          >
            <Security />
            {isOpen ? (
              <Typography variant='h6' fontWeight='bold'>
                User Auth
              </Typography>
            ) : (
              ''
            )}
          </Box>
        </HoverTooltip>

        {isMobile && isOpen && (
          <HoverTooltip title={'Collapse Menu'} placement={'bottom'}>
            <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </HoverTooltip>
        )}
      </Box>

      <List
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        {sidebarItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.children &&
              item.children.some((child) => location.pathname === child.path));
          return (
            <Box key={item.title}>
              {/* Parent Item Or Single Menu */}
              <HoverTooltip title={item.title} placement='bottom'>
                <ListItemButton
                  sx={{
                    justifyContent: isOpen ? 'flex-start' : 'center',
                    bgcolor: (theme) =>
                      isActive ? theme.palette.grey[300] : 'transparent',
                    color: (theme) =>
                      isActive ? theme.palette.grey[800] : 'inherit',
                  }}
                  component={item.path ? Link : 'div'}
                  to={item.path || '#'}
                  onClick={() => item.children && handleToggle(item.title)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: isOpen ? 40 : 'auto',
                      color: (theme) =>
                        isActive ? theme.palette.grey[800] : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && <ListItemText primary={item.title} />}
                  {isOpen &&
                    item.children &&
                    (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </HoverTooltip>

              {/* Child Items for (Dropdown) */}
              {item.children && (
                <Collapse
                  in={openMenus[item.title]}
                  timeout='auto'
                  unmountOnExit
                >
                  <List component='div' disablePadding>
                    {item.children.map((child) => {
                      const isChildActive = location.pathname === child.path;
                      return (
                        <HoverTooltip
                          title={child.title}
                          placement='bottom'
                          key={child.title}
                        >
                          <ListItemButton
                            component={Link}
                            to={child.path}
                            sx={{
                              pl: 4,
                              bgcolor: isChildActive
                                ? 'primary.light'
                                : 'transparent',
                              color: isChildActive ? 'primary.dark' : 'inherit',
                            }}
                          >
                            <ListItemText primary={child.title} />
                          </ListItemButton>
                        </HoverTooltip>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
