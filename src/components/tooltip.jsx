import { Tooltip, Box } from '@mui/material';

const HoverTooltip = ({ title, children, placement, arrow }) => {
  return (
    <Tooltip
      title={title}
      placement={placement || 'right'}
      arrow={arrow || false}
    >
      <Box component='span'>{children}</Box>
    </Tooltip>
  );
};

export default HoverTooltip;
