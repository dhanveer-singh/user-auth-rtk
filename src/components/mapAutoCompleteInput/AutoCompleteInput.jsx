import { useState, useRef } from 'react';

import { Autocomplete } from '@react-google-maps/api';

import InputField from '../formFields/inputField';

const AutoCompleteInput = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place || !place.address_components) return;

      const addressComponents = place.address_components;
      console.log(place);

      const locationData = {
        name: place.name || '',
        city: getComponent(addressComponents, 'locality'),
        state: getComponent(addressComponents, 'administrative_area_level_1'),
        country: getComponent(addressComponents, 'country'),
        postalCode: getComponent(addressComponents, 'postal_code'),
      };

      setInputValue(place.formatted_address);
      onSelect(locationData);
    }
  };

  const getComponent = (components, type) => {
    const item = components.find((comp) => comp.types.includes(type));
    return item ? item.long_name : '';
  };

  return (
    <Autocomplete
      onLoad={(autoC) => (autocompleteRef.current = autoC)}
      onPlaceChanged={handlePlaceChanged}
    >
      <InputField
        fullWidth
        label='Search Location'
        variant='outlined'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Autocomplete>
  );
};

export default AutoCompleteInput;
