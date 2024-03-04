import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';

// ... (resto de las importaciones)

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Prevenir que se llame dos veces en modo de desarrollo con React.StrictMode habilitado
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      console.log('No autenticado, redirigiendo');
      router
        .replace({
          pathname: '/auth/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady, isAuthenticated, router.asPath, router]); // Agregado router a las dependencias

  if (!checked) {
    return null;
  }

  // Si llegaste aquí, significa que la redirección no ocurrió, y eso nos dice que el usuario está autenticado/autorizado.

  return children;
};

// Resto del código


AuthGuard.propTypes = {
  children: PropTypes.node
};
