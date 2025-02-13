import { useState } from 'react';

import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from '../footer';
import Header from '../header';
import Sidebar from '../sidebar';

const MainLayout = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar - Always Open on Desktop, Toggle on Mobile */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            px: { xs: 2, sm: 4 },
            py: 2,
            overflowY: 'auto',
            minHeight: 'calc(100vh - 64px - 53px)',
          }}
        >
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
