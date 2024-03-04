import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  SvgIcon,
  Alert,
  Box,
  ListItemAvatar,
  IconButton,
  
} from '@mui/material';
import { DropzoneArea } from "mui-file-dropzone";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { GaleryList } from './galery-list';
import Zoom from '@mui/material/Zoom';
import LinearProgress from '@mui/material/LinearProgress';

import {API_URL} from '../../utils/constants'



export const GaleryProducts = (props) => {
 
  const {selected=[], id, sx, url } = props;
   // Inicializar el estado utilizando useState
   const [open, setOpen] = useState(false);
   const [files, setFiles] = useState([]);


  
    const subImage =async (files) =>{
      console.log("estos son tus archivos: ", files)
      
      const postData = {
        name: "",
        id:"",
        images: []
      };

      handleChange2();
      const url = `https://api.cloudinary.com/v1_1/ddsuzqzgh/image/upload`;
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append('upload_preset', 'v8xxvhbs');
        
        try {
          const response = await fetch(url, {
            method: "post",
            body: formData
          });
          
          const data = await response.json();
          handleChange2();
          handleChange();

          const image = {
            secure_url: data.secure_url,
            public_id: data.public_id
          };

          postData.name = data.original_filename;
          postData.id = id; 
          postData.images.push(image);

          
          console.log(`Respuesta para el archivo ${i}:`, data);
        } catch (error) {
          console.error(`Error en la solicitud para el archivo ${i}:`, error);
        }
      
      }
      try {
        console.log(postData)
      const jsonData = JSON.stringify(postData);
      
      const response = await fetch(`${API_URL}/galery/`, {
        method: 'POST',
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
    }catch (err) {
      // Manejar errores en caso de un error de red u otra excepción
      console.error('Error en la solicitud POST:', err);
    
    }
  
    }

   const handleSaveFiles =(inputProps)=>{
     setFiles(inputProps);
     console.log("esta llegnado esto: ",selected.images)
   }
   const [checked, setChecked] = React.useState(false);
   const [checked2, setChecked2] = React.useState(false);

   const handleChange = () => {
    setChecked((prev) => !prev);
    
  };
  const handleChange2 = () => {
    setChecked2((prev) => !prev);
    
  };
  const scrollDown=()=> {
    window.scrollBy({
      top: window.innerHeight, // Puedes ajustar la cantidad de desplazamiento según tus necesidades
      behavior: 'smooth',
    });
  }
 
  const estiloBoton = {
    animation: 'shake 0.5s ease-in-out infinite', // Ajusta la duración según tus preferencias
  };
   const icon =(
    <Alert onClose={() => {
    
        setChecked(false); // Cambia el estado de checked después de 2 segundos
         setChecked2(false);
    }}>¡Imagenes Agregadas! </Alert>
       
   );
  return (
    <Card sx={sx}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        PORTADA
      <ListItemAvatar>  
                {
                   url
                    ? (
                      <Box
                        component="img"
                        src={url}
                        sx={{
                          borderRadius: 0,
                          height: 108,
                          width: 108
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <Button
               onClick={scrollDown} 
                style={estiloBoton}
              > Agrega fotos a la galeria! </Button>
              </div>

              <GaleryList selec={selected.images}></GaleryList>
     <DropzoneArea 
        filesLimit={4}  
        acceptedFiles={['image/*']}
        dropzoneText={"Agrega nuevas imagenes al producto"}
        onChange={handleSaveFiles}
      />
       <Zoom in={checked2}>
        <LinearProgress />
      </Zoom>
        
        <Box style={{ height: checked ? 'auto' : 0 }}>
          <Zoom in={checked}>{icon}</Zoom>
        </Box>
       
       
      <div style={{ float: 'right', padding: '10px' }}>
        <Button
          startIcon={(
            <SvgIcon fontSize="small">
              <FileUploadIcon />
            </SvgIcon>
          )}
         
          variant="outlined"
          onClick={() => subImage(files)} 
        >
          CONFIRM
        </Button>
      </div>

     
    </Card>
  );
};

GaleryProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
