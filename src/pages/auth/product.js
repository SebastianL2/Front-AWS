
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { FormHelperText } from '@mui/material';
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
  

  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [categorias, setCategorias] = useState([]);

  useEffect(()=>{
    const fetchProducts = async () => {
     
        try {
            
            
            const response = await fetch(`${API_URL}api/Categorias/`)
            const data = await response.json()
            console.log("tranfusa",data)
            
            setCategorias(data)
            
        } catch (error) {
            
           console.log(error)
        }
    }
    fetchProducts()


},[])


  const formik = useFormik({
    initialValues: {
      codigo: '',
      nombre: '',
      caracteristicas: '',
      precio: 0,
      moneda: '',
      categorias: selectedCategories,
    },
    validationSchema: Yup.object({
      codigo: Yup.string().required('El código es requerido'),
      nombre: Yup.string().required('El nombre es requerido'),
      caracteristicas: Yup.string().required('Las características son requeridas'),
      precio: Yup.number().required('El precio es requerido').positive('El precio debe ser positivo')
    }),
    onSubmit: async (values, helpers) => {
       
      const jsonData = JSON.stringify(values);
      console.log('categorias',values.categorias);
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      try {
        const response = await fetch(`${API_URL}api/products/`, {
          method: 'POST',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token '+storedUserData.token
          },
        });
    
        if (response.ok) {
          
          console.log('Solicitud POST exitosa');
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "Producto Agregado"});
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
  

  
  const [isBoxVisible, setIsBoxVisible] = useState(true);

  const handleCloseBox = () => {
    setIsBoxVisible(false);
  };
  return (
    <>
     {isBoxVisible && (
  <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Esto centra verticalmente en la pantalla
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }}
>
  <Box
    sx={{
      maxWidth: 550,
      px: 3,
      py: '100px',
      width: '100%',
    }}
  >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Guardar Producto
              </Typography>
           
           
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
            <Stack spacing={3}>
              <TextField
                error={!!(formik.touched.codigo && formik.errors.codigo)}
                fullWidth
                helperText={formik.touched.codigo && formik.errors.codigo}
                label="Código"
                name="codigo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.codigo}
              />
              <TextField
                error={!!(formik.touched.nombre && formik.errors.nombre)}
                fullWidth
                helperText={formik.touched.nombre && formik.errors.nombre}
                label="Nombre"
                name="nombre"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nombre}
              />
              <TextField
                error={!!(formik.touched.caracteristicas && formik.errors.caracteristicas)}
                fullWidth
                helperText={formik.touched.caracteristicas && formik.errors.caracteristicas}
                label="Características"
                name="caracteristicas"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.caracteristicas}
              />
              <TextField
                error={!!(formik.touched.precio && formik.errors.precio)}
                fullWidth
                helperText={formik.touched.precio && formik.errors.precio}
                label="Precio"
                name="precio"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.precio}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={formik.values.moneda}
                  onChange={formik.handleChange}
                  name="moneda"
                  error={!!(formik.touched.moneda && formik.errors.moneda)}
                >
                  <MenuItem value="">
                    <em>Selecciona una moneda</em>
                  </MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="USD">COP</MenuItem>
                  
                </Select>
                {formik.touched.moneda && formik.errors.moneda && (
                  <FormHelperText error>{formik.errors.moneda}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
          <InputLabel id="categorias-label">Categorías</InputLabel>
          <Select
            labelId="categorias-label"
            multiple
            value={formik.values.categorias} // Usar formik.values.categorias en lugar de selectedCategories
            onChange={(e) => formik.setFieldValue('categorias', e.target.value)} // Actualizar el valor de categorias usando setFieldValue de formik
            onBlur={formik.handleBlur}
            name="categorias"
            error={formik.touched.categorias && Boolean(formik.errors.categorias)}
            renderValue={(selected) => (
              selected.map((value) => (
                <MenuItem key={value} value={value}>
                  {value} {/* Asegúrate de mostrar el nombre de la categoría en lugar de su ID */}
                </MenuItem>
              ))
            )}
          >
            {/* Mapea sobre tus categorías disponibles aquí */}
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.categorias && formik.errors.categorias && (
            <FormHelperText>{formik.errors.categorias}</FormHelperText>
          )}
        </FormControl>
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