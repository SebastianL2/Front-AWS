import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {API_URL} from '../../utils/constants'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import ciudadesData from '../../utils/ciudades.JSON'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';


const Page = () => {

  const [estado, setEstado] = React.useState('');
  const [estado2, setEstado2] = React.useState('');


  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();



  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const handleChange = (event) => {
 
    setEstado(event.target.value);
    formik.setFieldValue('role', event.target.value);
    console.log("hola . " + event.target.value)
  };

  const handleChange2 = (event) => {
 
  
    formik.setFieldValue('city', event.target.value);
    setEstado2(event.target.value)
    console.log("hola . " + event.target.value)

  };
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log("esta es tu imagen", selectedFile)
    handleButtonClick();
    if (selectedFile) {

      const url = `https://api.cloudinary.com/v1_1/ddsuzqzgh/image/upload`;
      
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append('upload_preset', 'v8xxvhbs');
        
        const response = await fetch(url, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Datos de la imagen: ', data);
          formik.setFieldValue('secure_url', data.secure_url);
          formik.setFieldValue('public_id', data.public_id);
          setSuccess(true);
          setLoading(false);
        } else {
          console.error('Error al subir la imagen a Cloudinary.');
        }
      } catch (error) {
        console.error('Error en la solicitud a Cloudinary:', error);
      }
      
      
    }
  };
 
  React.useEffect(() => {
    const timerRef = timer.current;
    return () => {
      clearTimeout(timerRef);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    
    }
  };
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      secure_url: '',
      public_id: '',
      city: '',
      role:'',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
        lastname: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      phone: Yup
      .string()
      .max(255)
      .required('Phone is required'),
      role: Yup
      .string()
      .max(255)
      .required('Role is required'),
    }),
    onSubmit: async (values, helpers) => {
     
      try {
        const jsonData = JSON.stringify(values);
        
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          console.log('Solicitud POST exitosa');
          helpers.setStatus({ success: true });
          helpers.setErrors({ submit: "Usuario agregado" });
          helpers.setSubmitting(true);
        } else {
          // Manejar errores en caso de una respuesta no exitosa
          const errorData = await response.json();
          console.error('Error en la solicitud POST:', errorData);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: errorData.message });
          helpers.setSubmitting(false);
        }
      } catch (err) {
        // Manejar errores en caso de un error de red u otra excepción
        console.error('Error en la solicitud POST:', err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
    
  });
  
  return (
    <>
      <Head>
        <title>
          Registro
        </title>
      </Head>
      <Box
        sx={{
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
                Registro
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                ya tines una cuenta?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Inicia sesion
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nombre"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                  <TextField
                  error={!!(formik.touched.lastname && formik.errors.lastname)}
                  fullWidth
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  label="Apellido"
                  name="lastname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
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
                
                <Box
                component="form"
                sx={{
                  '& > :not(style)': { width: '50ch' },
                }}
                Validate
                autoComplete="off"
              >
              <div style={{ display: 'flex' }}>
                <TextField style={{ marginRight: '20px' }}
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Telefono"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.phone}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{  position: 'relative' }}>
                  <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    component="label" 
                  >
                    <input 
                    type="file" 
                    style={{ display: 'none' }}
                     onChange={handleFileChange}
                    />
                    {success ? <CheckIcon /> : <AccountBoxIcon/>}
                  </Fab>
                    {loading && (
                      <CircularProgress
                        size={68}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: -6,
                          left: -6,
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box>
                
                </Box>
              
              </div>
            </Box>

                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': {  width: '50ch' },
                  }}
                  Validate
                  autoComplete="off"
                >

                  <div
                    style={{ display: 'flex' }}
                  >
                    <FormControl 
                      fullWidth 
                      style={{ marginRight: '20px' }}
                    >
                    <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={estado2}
                      onChange={handleChange2}
                    >
                      <MenuItem
                       value=""
                      >
                        <em>Selecione Ciudad</em>
                      </MenuItem>
                      {ciudadesData.ciudades.map((ciudad, index) => (
                      <MenuItem 
                      key={index} 
                      value={ciudad}
                      >
                        {ciudad}
                      </MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={estado}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Selecione un rol</em>
                      </MenuItem>
                      <MenuItem value="admin">Administrador</MenuItem>
                      <MenuItem value="seller">Vendedor</MenuItem>
                    </Select>
                  </FormControl>
               </div>
                </Box>
              </Stack>
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
                Continue
              </Button>
            </form>
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
