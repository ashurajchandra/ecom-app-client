import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Container,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../../context/authentication/AuthContext';
import  ToastNotification, { showErrorToast, showSuccessToast }  from "../shared/toast/Toaster";
interface CartProduct {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export const Cart: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCartProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/carts', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setCartProducts(response.data.data.products);
    } catch (error) {
      console.error('Error fetching cart products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, [state.getUserCart]);

  const handleUpdateProduct = async (productId: number, newQuantity: number) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:8001/api/carts/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating product quantity:', error);
    } finally {
      getCartProducts();
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`http://localhost:8001/api/carts/${productId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setIsLoading(false);
      showSuccessToast("Product Deleted")
    } catch (error) {
      console.error('Error deleting product from cart:', error);
      showErrorToast(error)
    } finally {
      getCartProducts();
      setIsLoading(false);
     
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px' }}>
        {cartProducts.length ==0 && <Typography>No Product is added in Cart</Typography>}
        {cartProducts.map((product) => (
          <Paper elevation={2} key={product._id} sx={{ padding: '16px', marginBottom: '16px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <img
                  src="product-image.jpg"
                  alt={product.name}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="subtitle1" color="primary">
                  Rs. {product.price}
                </Typography>
                {product?.description && (
                  <Typography variant="body1">Description: {product?.description}</Typography>
                )}
                <Box mt={2}>
                  <Typography variant="subtitle1">Quantity: {product.quantity}</Typography>
                  <IconButton
                    onClick={() => {
                      handleUpdateProduct(product._id, Math.max(1, product.quantity - 1));
                    }}
                    disabled={product.quantity === 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => handleUpdateProduct(product._id, product.quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="Remove"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Paper>
      <ToastNotification/>
    </Container>
  );
};
