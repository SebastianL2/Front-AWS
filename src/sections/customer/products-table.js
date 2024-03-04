
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ListItemAvatar,
  IconButton
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import React, { useEffect, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Edit from '../../pages/auth/editc'
import {API_URL} from '../../utils/constants'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import NwProductTable from './nwproducts-table';






export const ProductsTable = (props) => {

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(()=>{
      const fetchProducts = async () => {
          try {
              setLoading(true)
              const response = await fetch(`${API_URL}api/products/`)
              const data = await response.json()
              console.log('datos',data)
              setLoading(false)
              setProducts(data)
              setProductsLoaded(true);
          } catch (error) {
              setLoading(false)
              setError(error.message)
          }
      }
      fetchProducts()


  },[])

  const handleDelete = (id) => {
    
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    fetch(`${API_URL}api/products/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+storedUserData.token
      },
    })
      .then(() => {
        // Actualizar la lista de productos después de la eliminación
        setProducts(products.filter(product => product.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar producto:', error);
      });
  };
  const [showEdit, setShowEdit] = useState(false);
  const [id2, setId2] = useState(false);
  const handleEditClick = (prod) => {
    setShowEdit(!showEdit); 
    setProduct(prod);
    console.log(id2)
  };

  return (
    
    <Box>
          {showEdit && 
      
         <Edit product={product}></Edit>
        
      } 
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                   
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Codigo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Características</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>moneda</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
          { products && products.map((product) => {
                const isSelected = selected.includes(product.id);
                

                return (
                  <TableRow
                    hover
                    key={product.id}
                    selected={isSelected}
                  > 
                   
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(product.id);
                          } else {
                            onDeselectOne?.(product.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.codigo}</TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                          
                        <Typography variant="subtitle2">
                          {product.nombre}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    
                    <TableCell>{product.caracteristicas}</TableCell>
                    <TableCell>{product.precio}</TableCell>
                    <TableCell>{product.moneda}</TableCell>
                    
                    <TableCell>
                    <IconButton 
                    aria-label="delete" 
                    color="secondary" 
                    onClick={() => handleDelete(product.id)}
                    >
                    <DeleteIcon />
                    </IconButton>
                    <IconButton 
                    aria-label="delete" 
                    color="primary"
                    onClick={() => handleEditClick(product)}
                    >
                    <ModeEditIcon/>
                    </IconButton>
                   
                    </TableCell>
                  
                  </TableRow>
                  
                );
              })}
        </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
          
      
    </Card>

    {productsLoaded ? (
      <Card>
    
    </Card>
    ) : (
     <p>Los productos aún se están cargando...</p>
    )}
    </Box>

    
  );
};

