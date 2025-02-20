import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant='h4' component='h5'>
        {t('dashboard')}
      </Typography>
    </Box>
  );
};

export default Dashboard;
