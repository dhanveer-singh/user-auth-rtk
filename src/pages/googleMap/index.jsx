import { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import AutoCompleteInput from '@/components/mapAutoCompleteInput/AutoCompleteInput';

const GoogleMapScreen = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState({
    name: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  return (
    <Box>
      <Typography variant='h4' component='h5' mb={2}>
        {t('sidebar.google_map')}
      </Typography>
      <Container maxWidth='sm'>
        <AutoCompleteInput
          onSelect={setLocation}
          label='Search Location'
          placeholder='Search Location'
        />
        <Box mt={2}>
          {Object.entries(location).map(([key, value]) => (
            <Typography variant='body1' key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
              {value || 'NA'}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default GoogleMapScreen;
