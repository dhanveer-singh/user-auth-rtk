import { useState } from 'react';

import {
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  Notifications,
  ExpandMore,
  AccountCircle,
  ExitToApp,
  MenuOpen,
} from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  ListItemIcon,
  Divider,
  Select,
  FormControl,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import HoverTooltip from '../../tooltip';
import { clearUser } from '@/services/auth/authSlice';
import { setLanguage } from '@/store/slices/languageSlice';
import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';
import i18n from '@/utils/i18n';
import { showToast } from '@/utils/toast';
const Header = ({
  isSidebarOpen,
  isOpen,
  toggleSidebar,
  darkMode,
  toggleTheme,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const user =
    useSelector((state) => state?.persistedReducer?.authSlice?.user) || {};
  const currentLanguage =
    useSelector((state) => state?.persistedReducer?.language?.lang) || 'en';

  const handleMenuOpen = (event) => setAnchorEl(event?.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(clearUser());
    showToast.success(t('logout_success'));
  };

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    dispatch(setLanguage(newLang));
  };

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        zIndex: 1201,
        background: (theme) => theme.palette.grey[200],
        color: (theme) => theme.palette.grey[800],
        width: isSidebarOpen
          ? { xs: '100%', sm: 'calc(100% - 260px)' }
          : '100%',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Sidebar Toggle */}
        <HoverTooltip
          title={isOpen ? t('collapse_menu') : t('expand_menu')}
          placement='bottom'
        >
          <IconButton color='inherit' onClick={toggleSidebar}>
            {isOpen ? <MenuOpen /> : <MenuIcon />}
          </IconButton>
        </HoverTooltip>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color='inherit'>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Notifications */}
          <HoverTooltip title={t('notifications')} placement='bottom'>
            <IconButton color='inherit'>
              <Badge badgeContent={3} color='error'>
                <Notifications />
              </Badge>
            </IconButton>
          </HoverTooltip>

          {/* Language Selector */}
          <FormControl
            size='small'
            sx={{
              minWidth: 120,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <LanguageIcon sx={{ mr: 1, color: 'gray' }} />
            <Select
              value={currentLanguage}
              onChange={handleLanguageChange}
              displayEmpty
              sx={{ height: 32, fontSize: 14 }}
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='es'>Español</MenuItem>
            </Select>
          </FormControl>

          {/* User Profile Menu */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleMenuOpen}
          >
            <Avatar sx={{ bgcolor: deepOrange[400] }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={{ mx: 1, fontWeight: 500 }}>
              {user?.name}
            </Typography>
            <ExpandMore />
          </Box>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem disabled>
              <Typography variant='body1'>
                {t('welcome')}, {user?.name}!
              </Typography>
            </MenuItem>
            <Divider />
            <HoverTooltip title={t('profile')} placement='top'>
              <MenuItem
                component={Link}
                to={FRONTEND_ROUTES?.PROFILE}
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <AccountCircle fontSize='small' />
                </ListItemIcon>
                {t('profile')}
              </MenuItem>
            </HoverTooltip>
            <HoverTooltip title={t('logout')} placement='top'>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp fontSize='small' />
                </ListItemIcon>
                {t('logout')}
              </MenuItem>
            </HoverTooltip>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
