import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

const InputField = ({
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
}) => {
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
};

export default InputField;
