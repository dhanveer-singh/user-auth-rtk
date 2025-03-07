import { useState, useRef, useEffect, forwardRef } from 'react';

import { Autocomplete } from '@react-google-maps/api';

import InputField from '../formFields/inputField';

const AutoCompleteInput = forwardRef((props, ref) => {
  const { onSelect, label, placeholder, error, helperText } = props;
  const [inputValue, setInputValue] = useState('');
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place || !place.address_components) return;
      const addressComponents = place.address_components;

      const getComponent = (components, type) => {
        const item = components.find((comp) => comp.types.includes(type));
        return item ? item.long_name : '';
      };

      const updatedLocation = {
        name: place.formatted_address || place.name || '',
        city: getComponent(addressComponents, 'locality') || '',
        state:
          getComponent(addressComponents, 'administrative_area_level_1') || '',
        country: getComponent(addressComponents, 'country') || '',
        postalCode: getComponent(addressComponents, 'postal_code') || '',
      };

      setInputValue(place.formatted_address);
      onSelect(updatedLocation);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSelect({
      name: value,
      city: '',
      state: '',
      country: '',
      postalCode: '',
    });
  };

  useEffect(() => {
    return () => {
      autocompleteRef.current = null;
    };
  }, []);

  return (
    <Autocomplete
      onLoad={(autoC) => (autocompleteRef.current = autoC)}
      onPlaceChanged={handlePlaceChanged}
    >
      <InputField
        ref={ref}
        fullWidth
        label={label}
        variant='outlined'
        value={inputValue}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        onChange={handleInputChange}
      />
    </Autocomplete>
  );
});

AutoCompleteInput.displayName = 'AutoCompleteInput';

export default AutoCompleteInput;
