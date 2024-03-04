import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {API_URL} from '../../utils/constants'

export const AccountProfile = () => {
  const [user, setUser] = useState({
    id:'',
    avatar: '',
    city: '',
    country: 'Colombia',
    jobTitle: 'Senior Developer',
    name: '',
    timezone: 'GTM-7'
  });

  useEffect(() => {
    // Verificar si estamos en un entorno de navegador antes de usar localStorage
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const storedUserData = JSON.parse(localStorage.getItem('userData'));

      // Update the user state with stored data
      if (storedUserData) {
        setUser((prevUser) => ({
          ...prevUser,
          id: storedUserData.id,
          avatar: storedUserData.photo.secure_url,
          city: storedUserData.city,
          name: storedUserData.name
        }));
      }
    }
  }, []);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  });
  const [open, setOpen] = React.useState(false);
  const handleFileChange = async (event) => {
    setOpen(true);
    const selectedFile = event.target.files[0];
    console.log("esta es tu imagen", selectedFile)
    
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
          
          setUser((prevUser) => ({
            ...prevUser,
            avatar:  data.secure_url
          }));
          setOpen(false);
          try {
          
            const userData = {
               public_id:data.public_id,
               secure_url:data.secure_url

              
            };
            const jsonData = JSON.stringify(userData);
            
            const response = await fetch(`${API_URL}/users/${user.id}`, {
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
        


        } else {
          console.error('Error al subir la imagen a Cloudinary.');
        }
      } catch (error) {
        console.error('Error en la solicitud a Cloudinary:', error);
      }
      
      
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.city} {user.country}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        
        <Button
          fullWidth
          component="label"
        >
          Actualizar foto
          <VisuallyHiddenInput
           type="file"
            onChange={handleFileChange} 
          />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Button>
      </CardActions>
    </Card>
  );
};
