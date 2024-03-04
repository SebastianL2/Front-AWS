import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import {API_URL} from '../../utils/constants'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Edit = ({product}) => {
  

  const [filea, setFilea] = React.useState('');
  const handleFileChange = (event) => {
    setFilea(event.target.files[0]);
    if (filea) {
      
      console.log("Archivo seleccionado:", filea.name);
     
    }
  };
  
  const router = useRouter();
  const auth = useAuth();
  const [estado, setEstado] = React.useState('');
  const [categoria, setCategoria] = React.useState('');

  const handleChange = (event) => {
 
    setEstado(event.target.value);
    formik.setFieldValue('availability', event.target.value);
    console.log("hola . " + event.target.value)
  };
  

  const handleChange2 = (event) => {
    setCategoria(event.target.value);
    formik.setFieldValue('category', event.target.value);
    console.log("hola . " + event.target.value)
  };
  

  const formik = useFormik({
    initialValues: {
      nit: product.nit, 
      name: product.name, 
      direccion: product.direccion, 
      telefono: product.telefono,
      submit: null
    },
    validationSchema: Yup.object({
      nit: Yup
        .string()
        .required('El NIT es requerido'),
      name: Yup
        .string()
        .max(255)
        .required('El nombre es requerido'),
      direccion: Yup
        .string()
        .max(255)
        .required('La dirección es requerida'),
      telefono: Yup
        .string()
        .max(15)
        .required('El teléfono es requerido'),
    }),
    onSubmit: async (values, helpers) => {
      
      const jsonData = JSON.stringify(values);
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      try {
        const response = await fetch(`${API_URL}api/Empresas/${product.nit}/`, {
          method: 'PUT',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token '+storedUserData.token
          },
        });
    
        if (response.ok) {
          
          console.log('Solicitud POST exitosa');
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "Producto Editado"});
          helpers.setSubmitting(false);
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
  
  const [isBoxVisible, setIsBoxVisible] = useState(true);

  const handleCloseBox = () => {
    setIsBoxVisible(false);
  };
  return (
    <>
     {isBoxVisible && (
     <Box sx={{
      position: 'relative',
      width: '100%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}>
     
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
                Editar Empresa
              </Typography>
           
           
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
             
                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="NIT"
                  name="nit"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.nit}
                />
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
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="direccion"
                  name="direccion"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.direccion}
                />
                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="telefono"
                  name="telefono"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.telefono}
                />
            

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
      </Box>
      </Box>            
      )}
    </>
   
  );
};

Edit.getLayout = (edit) => (
  <AuthLayout>
    {edit}
  </AuthLayout>
);

export default Edit;