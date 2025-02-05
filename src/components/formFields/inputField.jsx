import React from 'react';

import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

// Forward ref to InputField component
const InputField = React.forwardRef(
  (
    {
      label,
      type = 'text',
      value,
      onChange,
      required = false,
      fullWidth = true,
      autoFocus = false,
      margin = 'normal',
      sx = {},
      startAdornment,
      endAdornment,
      error = false,
      helperText = '',
      ...props
    },
    ref // Receive the ref and pass it to the OutlinedInput
  ) => {
    return (
      <FormControl
        fullWidth={fullWidth}
        margin={margin}
        required={required}
        sx={sx}
        error={error} // Set error on FormControl for styling
      >
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <OutlinedInput
          id={label}
          ref={ref} // Pass the ref to OutlinedInput
          type={type}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          label={label}
          startAdornment={
            startAdornment && (
              <InputAdornment position='start'>{startAdornment}</InputAdornment>
            )
          }
          endAdornment={
            endAdornment && (
              <InputAdornment position='end'>{endAdornment}</InputAdornment>
            )
          }
          {...props}
        />
        {/* Render helper text below the input */}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

// Give the InputField component a display name
InputField.displayName = 'InputField';

export default InputField;
