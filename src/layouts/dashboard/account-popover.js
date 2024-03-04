import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open,name, email } = props;
  const router = useRouter();
  const auth = useAuth();
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );
  const handleRedirect = () => {
    router.push('/account');
  };
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography 
         variant="overline"
         onClick={handleRedirect}
         style={{ cursor: 'pointer', display: 'inline-block', position: 'relative' }}
         >
          Cuenta
        
        </Typography>
        <Typography
          color="primary"
          variant="body2"
        >
         {storedUserData && storedUserData.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
         {storedUserData && storedUserData.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem  onClick={handleSignOut}>
          Cerrar Sesion
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
