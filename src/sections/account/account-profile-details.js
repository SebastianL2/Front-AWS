import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import {API_URL} from '../../utils/constants'
import React, { useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const AccountProfileDetails = () => {
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  
  const formik = useFormik({
    initialValues: {
      name: storedUserData.name,
      lastname: storedUserData.lastname,
      email: storedUserData.email,
      phone: storedUserData.phone,
      role: storedUserData.role,
      city: 'Tunja',
      country: 'COLOMBIA',
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

       console.log('Form Submitted!');
      try {
        const jsonData = JSON.stringify(values);
        
        const response = await fetch(`${API_URL}/users/${storedUserData.id}`, {
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
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Submitted!');

    try {
      const jsonData = JSON.stringify(formik.values);
  
      const response = await fetch(`${API_URL}/users/${storedUserData.id}`, {
        method: 'PUT',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Solicitud POST exitosa');
      } else {
        // Manejar errores en caso de una respuesta no exitosa
        const errorData = await response.json();
        console.error('Error en la solicitud POST:', errorData);
      }
    } catch (err) {
      // Manejar errores en caso de un error de red u otra excepción
      console.error('Error en la solicitud POST:', err);
    }
  };


  return (
    <form
    noValidate
    onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="First name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastname"
                  helperText={formik.touched.name && formik.errors.lastname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.lastname}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
             
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                   <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      name='role'
                      value={formik.values.role}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="">
                        <em>Selecione un rol</em>
                      </MenuItem>
                      <MenuItem value="admin">Administrador</MenuItem>
                      <MenuItem value="seller">Vendedor</MenuItem>
                    </Select>
                  </FormControl>  
              </Grid>


            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button 
          type="submit" 
          variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
