import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import React, { useEffect, useState } from 'react';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import {API_URL} from '../../utils/constants'
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { GaleryProducts } from 'src/sections/galery/galery-producst';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
export const GaleryAddsProducts = (props) => {
  const [products, setProducts] = useState([])
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [id,setId] = useState('')
  const [url,setUrl] = useState('')
  const [galery,setGalery] = useState([])
  const {sx } = props;
  useEffect(()=>{


    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/products`)
            const data = await response.json()
            setLoading(false)
            setProducts(data.products)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }
    fetchProducts()
  
},[])

const saveId =(ide, secure_url)=>{
 console.log("sduue "+ide)
 setId(ide);
 setUrl(secure_url);

  const fetchProducts = async () => {
      try {
          setLoading(true)
          const response = await fetch(`${API_URL}/galery/${ide}`)
          const data = await response.json()
          setLoading(false)
          setGalery(data.galerys)
      } catch (error) {

          setLoading(false)
          setError(error.message)
      }
    }
    fetchProducts()
     console.log("datos de galery",galery)

  }
  return (
    <Card sx={sx}>
    <Grid
    container
    spacing={3}
    >
         <Grid
            xs={12}
            md={6}
            lg={4}
          >
   
      <CardHeader title="Latest Products" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const updatedAt = new Date(product.updatedAt);
          const ago = formatDistanceToNow(updatedAt);
          
          return (
            <Button
            onClick={() => saveId(product._id,product.images.secure_url)}
            key={product._id} 
            >
            <ListItem
              divider={hasDivider}
              key={product._id}
            >
              <ListItemAvatar>
                {
                  product.images
                    ? (
                      <Box
                        component="img"
                        src={product.images.secure_url}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
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
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            
            </ListItem>
            <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </Button>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          NEXT
        </Button>
      </CardActions>
   
    </Grid>
    <Grid
            xs={12}
            md={12}
            lg={8}
            >
              {id && url ? (
        <GaleryProducts 
        selected={galery} 
        id={id} 
        url={url} 
        />
      ) : (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh" // Ajusta la altura según tus necesidades
        >


        <Stack spacing={1}>
        <Typography 
        variant="body1" 
        color="primary"
        >
          Seleccione un producto porfavor, para ver la galería.
        </Typography>
        <Skeleton 
        variant="rectangular" 
        width={390} 
        height={360} 
        />
        
      </Stack>
      </Box>
      )}
            </Grid>


    </Grid>
    </Card>
  );
};


