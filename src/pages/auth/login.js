import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import {API_URL} from '../../utils/constants'
import LinearProgress from '@mui/material/LinearProgress';
import { AccountPopover } from 'src/layouts/dashboard/account-popover';
import { usePopover } from 'src/hooks/use-popover';
const Page = () => {
  const accountPopover = usePopover();
  const router = useRouter();
  const [userData1, setUserData1] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const auth = useAuth();
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState('email');
  const formik = useFormik({
    initialValues: {
      email: 'test5@emia2.com',
      password: 'contraseña123',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      setShow(true)
      
      try {
        const response = await fetch(`${API_URL}api/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
    
        if (response.ok) {
          
          const userData = await response.json(); // Obtiene los datos del usuario
           // Extrae el nombre y el email del objeto
           console.log("Hola",userData.user)
          localStorage.setItem('userData', JSON.stringify(userData.user));
          auth.skip();
          router.push('/');

         
        } else {
          // Si la respuesta del servidor no es exitosa, maneja el error
          const errorData = await response.json();
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: errorData.detail });
          console.log(errorData.message)
          helpers.setSubmitting(false);
        }
      } catch (err) {
        // Si hay un error en la solicitud, maneja el error
        console.error('Error en la solicitud POST:', err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  
  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );
  const handleSkip = useCallback(
    () => {
     
    },
    [auth, router]
  );

  return (
    <>
      <Head>
        <title>
          Login 
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Solo podras acceder con la cuenta de 
                &nbsp;
                <Link
                  underline="hover"
                  variant="subtitle2"
                >
                 {userData1.name}
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
              <Tab
                label="Phone Number"
                value="phoneNumber"
              />
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >      
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                 {show ? (
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                  </Box>
                 ) : null}
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continuar
                </Button>
              
                <AccountPopover   
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
                name='userData1.name' email={userData1.email} />
              </form>
              
            )}
            {method === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;