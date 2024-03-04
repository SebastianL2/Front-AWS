import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import BurstModeIcon from '@mui/icons-material/BurstMode';
export const items = [
  {
    title: 'Productos',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
        
      </SvgIcon>
    )
  },
  {
    title: 'Empresas',
    path: '/empresa',
    icon: (
      <SvgIcon fontSize="small">
        <BurstModeIcon />
        
      </SvgIcon>
    )
  },
  {
    title: 'Inventario',
    path: '/inventory',
    icon: (
      <SvgIcon fontSize="small">
        <BurstModeIcon />
        
      </SvgIcon>
    )
  }
];
