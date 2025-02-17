import { Card, CardContent, CardHeader } from '@mui/material';

const CardWrapper = ({ title, children, sx = {} }) => {
  return (
    <Card
      variant='outlined'
      sx={{ p: 2, mt: 1, border: 0, borderRadius: 2, boxShadow: 5, ...sx }}
    >
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
