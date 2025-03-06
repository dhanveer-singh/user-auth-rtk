import { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { LoadScript } from '@react-google-maps/api';
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
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={['places']}
      >
        <Container maxWidth='sm'>
          <AutoCompleteInput onSelect={setLocation} />
          <Box mt={2}>
            {Object.entries(location).map(([key, value]) => (
              <Typography variant='body1' key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                {value || 'NA'}
              </Typography>
            ))}
          </Box>
        </Container>
      </LoadScript>
    </Box>
  );
};

export default GoogleMapScreen;
